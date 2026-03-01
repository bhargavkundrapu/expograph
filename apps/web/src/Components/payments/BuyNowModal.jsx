import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch, ApiError } from "../../services/api";

function formatRupees(paise) {
  return `₹${(paise / 100).toFixed(2)}`;
}

const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(window.Razorpay);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Failed to load payment gateway. Please check your connection and try again."));
    document.body.appendChild(script);
    setTimeout(() => {
      if (!window.Razorpay) reject(new Error("Payment gateway took too long to load. Please refresh and try again."));
    }, 15000);
  });
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_SEC = 60;

function OtpInput({ length = 6, value, onChange, disabled }) {
  const refs = useRef([]);

  const handleChange = (idx, char) => {
    if (!/^\d?$/.test(char)) return;
    const arr = value.split("");
    arr[idx] = char;
    const next = arr.join("").slice(0, length);
    onChange(next);
    if (char && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          style={{ color: "#0f172a", backgroundColor: "#fff", caretColor: "#2563eb" }}
          className="w-10 h-12 text-center text-lg font-bold border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
        />
      ))}
    </div>
  );
}

export function BuyNowModal({ open, onClose, item, onSuccess, onError, prefill, isLoggedIn }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [emailTouched, setEmailTouched] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Email verification state
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);
  const verifiedEmailRef = useRef("");
  const submittingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("form");

  const isAuth = !!(isLoggedIn && prefill?.email);

  // When the modal opens, decide the flow
  useEffect(() => {
    if (!open) return;
    if (prefill) {
      setForm({
        name: prefill.name ?? "",
        email: prefill.email ?? "",
        phone: prefill.phone ?? "",
        college: prefill.college ?? "",
      });
    }
    if (isAuth) {
      setEmailVerified(true);
      verifiedEmailRef.current = (prefill.email ?? "").trim().toLowerCase();
      setStep("summary");
    } else {
      setStep("form");
    }
  }, [open]); // only re-run when open changes

  useEffect(() => {
    if (!open || !item?.type || !item?.id) {
      setPriceBreakdown(null);
      return;
    }
    setPriceLoading(true);
    setPriceBreakdown(null);
    apiFetch(`/api/v1/payments/price-breakdown?item_type=${item.type}&item_id=${item.id}`)
      .then((res) => {
        const data = res?.data ?? res;
        setPriceBreakdown(data);
      })
      .catch(() => setPriceBreakdown(null))
      .finally(() => setPriceLoading(false));
  }, [open, item?.type, item?.id]);

  // Reset verification when email changes (only for guest users)
  useEffect(() => {
    if (!isAuth && form.email.trim().toLowerCase() !== verifiedEmailRef.current) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtpValue("");
      setOtpError("");
    }
  }, [form.email, isAuth]);

  const startCooldown = useCallback(() => {
    setCooldown(COOLDOWN_SEC);
    clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => clearInterval(cooldownRef.current);
  }, []);

  const reset = () => {
    setForm({ name: "", email: "", phone: "", college: "" });
    setEmailTouched(false);
    setPriceBreakdown(null);
    setError("");
    setStep("form");
    setLoading(false);
    setEmailVerified(false);
    setOtpSent(false);
    setOtpValue("");
    setOtpError("");
    setCooldown(0);
    clearInterval(cooldownRef.current);
    verifiedEmailRef.current = "";
    submittingRef.current = false;
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleSendOtp = async () => {
    const email = form.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      setOtpError("Please enter a valid email first.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      await apiFetch("/api/v1/payments/verify-email/send", {
        method: "POST",
        body: { email },
      });
      setOtpSent(true);
      setOtpValue("");
      startCooldown();
    } catch (err) {
      setOtpError(err?.message || "Failed to send verification code.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const email = form.email.trim().toLowerCase();
    if (otpValue.length < 6) {
      setOtpError("Please enter the full 6-digit code.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      await apiFetch("/api/v1/payments/verify-email/confirm", {
        method: "POST",
        body: { email, otp: otpValue },
      });
      setEmailVerified(true);
      verifiedEmailRef.current = email;
      setOtpError("");
    } catch (err) {
      setOtpError(err?.message || "Invalid code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (submittingRef.current) return;
    if (!emailVerified) {
      setError("Please verify your email before proceeding.");
      return;
    }
    submittingRef.current = true;
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/api/v1/payments/razorpay/create-order", {
        method: "POST",
        body: {
          item_type: item.type,
          item_id: item.id,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          college: form.college.trim() || undefined,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });

      const data = res?.data || res;
      if (!data?.razorpay_order_id || !data?.key_id) {
        throw new Error("Invalid response from server");
      }

      const Razorpay = await loadRazorpay();
      const rzp = new Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency || "INR",
        order_id: data.razorpay_order_id,
        name: "ExpoGraph",
        description: item.title,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },
        notes: {
          item_type: item.type,
          item_id: item.id,
          college: form.college.trim() || "",
        },
        handler: async (response) => {
          setLoading(true);
          setError("");
          try {
            const verifyRes = await apiFetch("/api/v1/payments/razorpay/verify-complete", {
              method: "POST",
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            });
            const unlocked = verifyRes?.unlocked ?? verifyRes?.data?.unlocked;
            const redirect = verifyRes?.redirect ?? verifyRes?.data?.redirect;
            setStep("success");
            setLoading(false);
            if (unlocked) {
              onSuccess?.();
              return;
            }
            if (redirect) {
              window.location.href = redirect;
              return;
            }
            onSuccess?.();
          } catch (e) {
            console.error("[Payment] Verify failed:", e);
            setStep("success");
            setLoading(false);
            setError(e?.message || "Could not complete registration. Please go to login and contact support.");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
        redirect: false,
      });

      rzp.on("payment.failed", () => {
        setLoading(false);
        onError?.();
        const params = new URLSearchParams();
        if (item?.title) params.set("title", item.title);
        if (item?.type) params.set("item_type", item.type);
        if (item?.id) params.set("item_id", item.id);
        const base = typeof window !== "undefined" ? window.location.origin : "";
        window.location.href = `${base}/payment-failure${params.toString() ? `?${params.toString()}` : ""}`;
      });

      rzp.open();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : (err?.message || "Something went wrong");
      setError(msg);
      setLoading(false);
      submittingRef.current = false;
      onError?.(err);
    }
  };

  if (!open) return null;

  const emailValid = EMAIL_RE.test(form.email?.trim());

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 pb-8 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {step === "form" && (
            <>
              <style>{`
                .buy-now-modal-form input::placeholder { color: #94a3b8; }
                .buy-now-modal-form input::-webkit-input-placeholder { color: #94a3b8; }
              `}</style>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Complete your purchase</h2>
              <p className="text-slate-600 text-sm mb-2">{item?.title}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="buy-now-modal-form mt-10 pt-6 border-t border-slate-100 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    autoComplete="name"
                    style={{ color: "#0f172a", backgroundColor: "#ffffff", caretColor: "#0f172a" }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Your name"
                  />
                </div>

                {/* Email + Verification */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onBlur={() => setEmailTouched(true)}
                      required
                      autoComplete="email"
                      disabled={emailVerified}
                      style={{ color: "#0f172a", backgroundColor: emailVerified ? "#f0fdf4" : "#ffffff", caretColor: "#0f172a" }}
                      className={`flex-1 min-w-0 px-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${
                        emailVerified
                          ? "border-green-300 bg-green-50"
                          : emailTouched && form.email && !emailValid
                          ? "border-red-400 focus:ring-red-400/20 focus:border-red-400"
                          : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="you@example.com"
                    />
                    {!emailVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!emailValid || otpLoading || cooldown > 0}
                        className="shrink-0 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                      >
                        {otpLoading ? (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Sending
                          </span>
                        ) : cooldown > 0 ? (
                          `${cooldown}s`
                        ) : otpSent ? (
                          "Resend"
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}
                    {emailVerified && (
                      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {emailVerified && (
                    <p className="mt-1.5 text-green-600 text-xs font-medium flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Email verified
                    </p>
                  )}

                  {emailTouched && form.email && !emailValid && !emailVerified && (
                    <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                      Please enter a valid email address
                    </p>
                  )}

                  {/* OTP Entry */}
                  <AnimatePresence>
                    {otpSent && !emailVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                          <p className="text-sm text-slate-600 text-center">
                            Enter the 6-digit code sent to <span className="font-medium text-slate-900">{form.email}</span>
                          </p>
                          <OtpInput
                            value={otpValue}
                            onChange={setOtpValue}
                            disabled={otpLoading}
                          />
                          {otpError && (
                            <p className="text-red-500 text-xs text-center">{otpError}</p>
                          )}
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpValue.length < 6 || otpLoading}
                            className="w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            {otpLoading ? (
                              <span className="flex items-center justify-center gap-1.5">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                Verifying
                              </span>
                            ) : (
                              "Confirm code"
                            )}
                          </button>
                          <p className="text-[11px] text-slate-400 text-center">
                            Didn't receive it? Check your spam folder or {cooldown > 0 ? `resend in ${cooldown}s` : <button type="button" onClick={handleSendOtp} className="text-blue-600 hover:underline font-medium">resend code</button>}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!otpSent && !emailVerified && (
                    <p className="mt-1.5 text-amber-600 text-[11px] flex items-start gap-1.5 leading-relaxed bg-amber-50 border border-amber-200 rounded-md px-2.5 py-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      <span>We&apos;ll send a verification code to confirm your email. This ensures your login access after purchase.</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                    minLength={10}
                    autoComplete="tel"
                    style={{ color: "#0f172a", backgroundColor: "#ffffff", caretColor: "#0f172a" }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">College</label>
                  <input
                    type="text"
                    value={form.college}
                    onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))}
                    autoComplete="organization"
                    style={{ color: "#0f172a", backgroundColor: "#ffffff", caretColor: "#0f172a" }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="College or institution"
                  />
                </div>

                {/* Price summary */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Price summary</p>
                  {priceLoading ? (
                    <div className="h-12 flex items-center justify-center text-slate-400 text-sm">Loading…</div>
                  ) : priceBreakdown ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Course / Pack price</span>
                        <span className="font-medium text-slate-900">{formatRupees(priceBreakdown.base_amount)}</span>
                      </div>
                      {priceBreakdown.platform_fee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Platform fee ({priceBreakdown.platform_fee_percent}%)</span>
                          <span className="font-medium text-slate-900">{formatRupees(priceBreakdown.platform_fee)}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Could not load price details.</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !emailVerified}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      emailVerified
                        ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Opening..." : !emailVerified ? "Verify email to pay" : "Pay & continue"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "summary" && (
            <>
              <style>{`
                .buy-summary-form input::placeholder { color: #94a3b8; }
              `}</style>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 truncate">{form.name || form.email}</h2>
                  <p className="text-slate-500 text-xs truncate flex items-center gap-1">
                    {form.email}
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm mt-3 mb-4">{item?.title}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Editable fields for missing info */}
              <div className="buy-summary-form space-y-3 mb-4">
                {!form.name && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      style={{ color: "#0f172a", backgroundColor: "#fff" }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      placeholder="Your name"
                    />
                  </div>
                )}
                {(!form.phone || form.phone.trim().length < 10) && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      style={{ color: "#0f172a", backgroundColor: "#fff" }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                )}
              </div>

              {/* Price summary */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Price summary</p>
                {priceLoading ? (
                  <div className="h-12 flex items-center justify-center text-slate-400 text-sm">Loading…</div>
                ) : priceBreakdown ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Course / Pack price</span>
                      <span className="font-medium text-slate-900">{formatRupees(priceBreakdown.base_amount)}</span>
                    </div>
                    {priceBreakdown.platform_fee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Platform fee ({priceBreakdown.platform_fee_percent}%)</span>
                        <span className="font-medium text-slate-900">{formatRupees(priceBreakdown.platform_fee)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between text-sm">
                      <span className="font-semibold text-slate-900">Total</span>
                      <span className="font-bold text-slate-900">
                        {formatRupees((priceBreakdown.base_amount || 0) + (priceBreakdown.platform_fee || 0))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Could not load price details.</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || priceLoading || !form.name.trim() || form.phone.trim().length < 10}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Opening…
                    </span>
                  ) : (
                    "Pay & continue"
                  )}
                </button>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-4">
              {error ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Payment successful</h3>
                  <p className="text-red-600 text-sm mb-6">{error}</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Course unlocked!</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    You can access your course now. Click Close to continue.
                  </p>
                </>
              )}
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    onSuccess?.();
                    onClose?.();
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Close
                </button>
                {error && (
                  <button
                    type="button"
                    onClick={() => {
                      const q = form.email ? `?email=${encodeURIComponent(form.email)}` : "";
                      window.location.href = `/login${q}`;
                    }}
                    className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                  >
                    Go to Login
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

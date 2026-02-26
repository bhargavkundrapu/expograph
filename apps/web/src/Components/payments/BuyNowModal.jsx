import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch, ApiError } from "../../services/api";

function formatRupees(paise) {
  return `₹${(paise / 100).toFixed(2)}`;
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(window.Razorpay);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    document.body.appendChild(script);
  });
};

export function BuyNowModal({ open, onClose, item, onSuccess, onError, prefill }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);

  useEffect(() => {
    if (open && prefill) {
      setForm({
        name: prefill.name ?? "",
        email: prefill.email ?? "",
        phone: prefill.phone ?? "",
        college: prefill.college ?? "",
      });
    }
  }, [open, prefill]);

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("form");

  const reset = () => {
    setForm({ name: "", email: "", phone: "", college: "" });
    setPriceBreakdown(null);
    setError("");
    setStep("form");
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          setStep("success");
          setLoading(false);
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
            if (unlocked) {
              return;
            }
            if (redirect) {
              window.location.href = redirect;
              return;
            }
          } catch (e) {
            console.error("[Payment] Verify failed:", e);
            setError(e?.message || "Could not complete registration. Please go to login and contact support.");
            return;
          }
          onSuccess?.();
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
        window.location.href = `/payment-failure${params.toString() ? `?${params.toString()}` : ""}`;
      });

      rzp.open();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : (err?.message || "Something went wrong");
      setError(msg);
      setLoading(false);
      onError?.(err);
    }
  };

  if (!open) return null;

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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    autoComplete="email"
                    style={{ color: "#0f172a", backgroundColor: "#ffffff", caretColor: "#0f172a" }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="you@example.com"
                  />
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

                {/* Price summary - at end of form */}
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
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Opening..." : "Pay & continue"}
                  </button>
                </div>
              </form>
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

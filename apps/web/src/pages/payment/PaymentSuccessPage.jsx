import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

/**
 * Payment success page - handles GET redirect from Razorpay (or manual navigation)
 * when user lands with razorpay_payment_id, razorpay_order_id, razorpay_signature in URL.
 * Calls verify-complete API to create user and enroll, then redirects to login.
 */
export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing | success | error
  const [message, setMessage] = useState("Completing your registration...");

  useEffect(() => {
    const paymentId = searchParams.get("razorpay_payment_id");
    const orderId = searchParams.get("razorpay_order_id");
    const signature = searchParams.get("razorpay_signature");

    if (!paymentId || !orderId || !signature) {
      setStatus("error");
      setMessage("Invalid payment link. Please go to login and try again.");
      return;
    }

    async function verify() {
      try {
        const res = await apiFetch("/api/v1/payments/razorpay/verify-complete", {
          method: "POST",
          body: {
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
          },
        });
        const redirect = res?.redirect ?? res?.data?.redirect;
        if (redirect) {
          window.location.href = redirect;
          return;
        }
        setStatus("success");
        setMessage("Registration complete! Redirecting to login...");
        navigate("/login", { replace: true });
      } catch (e) {
        setStatus("error");
        setMessage(e?.message || "Registration could not be completed. Please contact support.");
      }
    }

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h1>
            <p className="text-slate-600">{message}</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Success!</h1>
            <p className="text-slate-600">{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h1>
            <p className="text-slate-600 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

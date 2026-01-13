import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { FaSignInAlt, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card from "../../Components/ui/Card";
import Button from "../../Components/ui/Button";

function routeForRole(role) {
  if (role === "SuperAdmin") return "/lms/superadmin";
  if (role === "TenantAdmin") return "/lms/admin";
  if (role === "Mentor") return "/lms/mentor";
  return "/lms/student";
}

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      nav(routeForRole(data.role), { replace: true });
    } catch (e2) {
      setErr(e2?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 animate-fadeIn">
      <Card variant="elevated" className="p-6 sm:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-green-600 shadow-medium mb-4">
            <FaSignInAlt className="text-white text-2xl sm:text-3xl" />
          </div>
          <h1 className="section-hero text-3xl sm:text-4xl mb-3">Welcome Back</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Use your ExpoGraph account credentials to continue
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
              <FaEnvelope className="text-green-600" />
              Email Address
            </label>
            <input
              className="w-full border-2 border-green-200 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@expograph.in"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
              <FaLock className="text-green-600" />
              Password
            </label>
            <input
              className="w-full border-2 border-green-200 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {err ? (
            <div className="p-3 sm:p-4 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm flex items-center gap-2 animate-slideIn">
              <span className="text-red-600">⚠</span>
              {err}
            </div>
          ) : null}

          <Button
            variant="gradient"
            size="lg"
            icon={FaSignInAlt}
            fullWidth
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-green-200">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
            <FaUserShield className="text-green-600" />
            <span>Secure authentication powered by ExpoGraph</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

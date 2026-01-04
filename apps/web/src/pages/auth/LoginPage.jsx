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
      <Card variant="elevated" className="p-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 mb-4">
            <FaSignInAlt className="text-white text-3xl" />
          </div>
          <h1 className="section-hero text-4xl mb-3">Welcome Back</h1>
          <p className="text-gray-400">
            Use your ExpoGraph account credentials to continue
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <FaEnvelope className="text-cyan-400" />
              Email Address
            </label>
            <input
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@expograph.in"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <FaLock className="text-cyan-400" />
              Password
            </label>
            <input
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {err ? (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2 animate-slideIn">
              <span className="text-red-400">⚠</span>
              {err}
            </div>
          ) : null}

          <Button
            variant="gradient"
            size="lg"
            icon={FaSignInAlt}
            className="w-full"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-500">
          <FaUserShield className="text-cyan-400" />
          <span>Role redirects automatically after login</span>
          <HiSparkles className="text-cyan-400 animate-pulse-slow" />
        </div>
      </Card>
    </div>
  );
}

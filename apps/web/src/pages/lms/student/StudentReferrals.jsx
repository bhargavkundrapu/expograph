import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { 
  FaGift, 
  FaCopy, 
  FaShareAlt,
  FaCheckCircle,
  FaUsers,
  FaTrophy
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import Button from "../../../Components/ui/Button";

export default function StudentReferrals() {
  const { token } = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const alive = useRef(true);

  async function loadReferralCode(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/referrals/me/referral-code", { token, signal });
      const data = unwrapData(json);
      if (alive.current && data?.code) {
        setReferralCode(data.code);
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load referral code");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadReferralCode(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  function copyCode() {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function copyReferralUrl() {
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(url);
    alert("Referral URL copied to clipboard! Share it with your friends.");
  }

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Referral Code" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadReferralCode(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30">
              <FaGift className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Referrals</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Share and earn rewards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Card */}
      <Card variant="gradient" className="p-8 border-yellow-500/30" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="text-center mb-6">
          <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30 mb-4">
            <FaGift className="text-white text-4xl" />
          </div>
          <CardTitle className="text-3xl mb-2 text-yellow-300">Your Referral Code</CardTitle>
          <CardDescription className="text-lg">Share this code with friends to earn rewards</CardDescription>
        </div>

        <div className="layout-flex-col gap-md">
          <div>
            <label className="layout-flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <FaGift className="text-yellow-400" />
              Referral Code
            </label>
            <div className="layout-flex gap-3">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 border-2 border-yellow-500/30 bg-gray-900 text-yellow-300 px-4 py-3 rounded-lg font-mono text-lg font-bold text-center"
              />
              <Button
                variant="gradient"
                size="lg"
                icon={copied ? FaCheckCircle : FaCopy}
                onClick={copyCode}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="layout-flex gap-3">
            <Button
              variant="outline"
              size="md"
              icon={FaShareAlt}
              onClick={copyReferralUrl}
              className="flex-1"
            >
              Copy Referral URL
            </Button>
          </div>
        </div>
      </Card>

      {/* How It Works */}
      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.1s', width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center gap-md mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30">
              <FaUsers className="text-yellow-400 text-xl" />
            </div>
            <CardTitle className="text-lg" style={{ margin: 0 }}>Share</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Share your unique referral code or URL with friends, family, or on social media.
          </CardDescription>
        </Card>

        <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.2s', width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center gap-md mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30">
              <FaCheckCircle className="text-yellow-400 text-xl" />
            </div>
            <CardTitle className="text-lg" style={{ margin: 0 }}>They Join</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            When someone signs up using your referral code, they get started on their learning journey.
          </CardDescription>
        </Card>

        <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.3s', width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center gap-md mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30">
              <FaTrophy className="text-yellow-400 text-xl" />
            </div>
            <CardTitle className="text-lg" style={{ margin: 0 }}>You Earn</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Earn rewards when your referrals complete courses or reach milestones. Check with admin for reward details.
          </CardDescription>
        </Card>
      </div>

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30">
            <HiSparkles className="text-yellow-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Referrals</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Help grow the ExpoGraph community and earn rewards! Share your referral code with others. 
              When they sign up and start learning, you may be eligible for rewards. Contact your administrator for more details about the referral program.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}


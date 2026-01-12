import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
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
      <div>
        <Skeleton />
        <Skeleton />
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Referrals</h1>
              <p>Share and earn rewards</p>
            </div>
          </div>
        </div>
      </div>

      <Card variant="gradient">
        <div>
          <div>
          </div>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with friends to earn rewards</CardDescription>
        </div>

        <div>
          <div>
            <label>
              Referral Code
            </label>
            <div>
              <input
                type="text"
                value={referralCode}
                readOnly
              />
              <Button
                variant="gradient"
                size="lg"
                onClick={copyCode}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              size="md"
              onClick={copyReferralUrl}
            >
              Copy Referral URL
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <CardTitle>Share</CardTitle>
          </div>
          <CardDescription>
            Share your unique referral code or URL with friends, family, or on social media.
          </CardDescription>
        </Card>

        <Card variant="elevated">
          <div>
            <div>
            </div>
            <CardTitle>They Join</CardTitle>
          </div>
          <CardDescription>
            When someone signs up using your referral code, they get started on their learning journey.
          </CardDescription>
        </Card>

        <Card variant="elevated">
          <div>
            <div>
            </div>
            <CardTitle>You Earn</CardTitle>
          </div>
          <CardDescription>
            Earn rewards when your referrals complete courses or reach milestones. Check with admin for reward details.
          </CardDescription>
        </Card>
      </div>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Referrals</CardTitle>
            <CardDescription>
              Help grow the ExpoGraph community and earn rewards! Share your referral code with others. 
              When they sign up and start learning, you may be eligible for rewards. Contact your administrator for more details about the referral program.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function StudentWorkshops() {
  const { token } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [registering, setRegistering] = useState({});
  const alive = useRef(true);

  async function loadWorkshops(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/public/workshops", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setWorkshops(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load workshops");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function handleRegister(workshopSlug) {
    setRegistering(prev => ({ ...prev, [workshopSlug]: true }));
    try {
      await apiFetch(`/api/v1/public/workshops/${workshopSlug}/register`, {
        method: "POST",
        token,
        body: {
          name: "",
          email: "",
        },
      });
      alert("Successfully registered for workshop! ✅");
      const ac = new AbortController();
      loadWorkshops(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to register for workshop");
    } finally {
      setRegistering(prev => ({ ...prev, [workshopSlug]: false }));
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadWorkshops(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div>
        <Skeleton />
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Workshops" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadWorkshops(ac.signal);
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
              <h1>Workshops</h1>
              <p>Register for upcoming workshops and events</p>
            </div>
          </div>
        </div>
      </div>

      {workshops.length === 0 ? (
        <EmptyState
          title="No Workshops Available"
          message="There are currently no workshops scheduled. Check back later for upcoming events!"
        />
      ) : (
        <div>
          {workshops.map((workshop, idx) => (
            <Card
              key={workshop.id || workshop.slug || idx}
              variant="elevated"
            >
              <div>
                <div>
                  <div>
                  </div>
                  <CardTitle>{workshop.title}</CardTitle>
                </div>
                {workshop.status && (
                  <span>
                    {workshop.status}
                  </span>
                )}
              </div>

              {workshop.description && (
                <CardDescription>
                  {workshop.description}
                </CardDescription>
              )}

              <div>
                {workshop.date && (
                  <div>
                    <span>{formatDate(workshop.date)}</span>
                  </div>
                )}
                {workshop.location && (
                  <div>
                    <span>{workshop.location}</span>
                  </div>
                )}
                {workshop.max_participants && (
                  <div>
                    <span>Max Participants: {workshop.max_participants}</span>
                  </div>
                )}
              </div>

              <Button
                variant="gradient"
                size="md"
                onClick={() => handleRegister(workshop.slug)}
                disabled={registering[workshop.slug] || workshop.status !== 'published'}
              >
                {registering[workshop.slug] ? "Registering..." : "Register for Workshop"}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

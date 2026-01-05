import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { 
  FaGraduationCap, 
  FaCalendar, 
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
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
          name: "", // Will be filled from user profile
          email: "", // Will be filled from user profile
        },
      });
      alert("Successfully registered for workshop! ✅");
      // Reload workshops to update registration status
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
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <div className="layout-grid-2 gap-lg">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Workshops</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Register for upcoming workshops and events</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workshops List */}
      {workshops.length === 0 ? (
        <EmptyState
          title="No Workshops Available"
          message="There are currently no workshops scheduled. Check back later for upcoming events!"
        />
      ) : (
        <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
          {workshops.map((workshop, idx) => (
            <Card
              key={workshop.id || workshop.slug || idx}
              variant="elevated"
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
            >
              <div className="layout-flex items-start justify-between gap-md mb-4">
                <div style={{ flex: 1 }}>
                  <div className="layout-flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400/20 to-cyan-500/20 border border-teal-400/30">
                      <FaGraduationCap className="text-teal-400" />
                    </div>
                    <CardTitle className="text-xl" style={{ margin: 0 }}>{workshop.title}</CardTitle>
                  </div>
                  {workshop.status && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                      workshop.status === 'published' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                      'bg-gray-800 border border-gray-700 text-gray-400'
                    }`}>
                      {workshop.status}
                    </span>
                  )}
                </div>
              </div>

              {workshop.description && (
                <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                  {workshop.description}
                </CardDescription>
              )}

              <div className="layout-flex-col gap-sm mb-4">
                {workshop.date && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaCalendar className="text-teal-400" />
                    <span>{formatDate(workshop.date)}</span>
                  </div>
                )}
                {workshop.location && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaMapMarkerAlt className="text-teal-400" />
                    <span>{workshop.location}</span>
                  </div>
                )}
                {workshop.max_participants && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaUsers className="text-teal-400" />
                    <span>Max Participants: {workshop.max_participants}</span>
                  </div>
                )}
              </div>

              <Button
                variant="gradient"
                size="md"
                icon={FaCheckCircle}
                onClick={() => handleRegister(workshop.slug)}
                disabled={registering[workshop.slug] || workshop.status !== 'published'}
                className="w-full"
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


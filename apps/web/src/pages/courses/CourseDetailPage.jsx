import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiFetch } from "../../services/api";
import { Header } from "../../Components/ui/header-2";
import { BuyNowModal } from "../../Components/payments/BuyNowModal";
import { cn } from "../../lib/utils";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

function formatPrice(paise) {
  if (paise == null || paise === undefined) return "—";
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [buyTarget, setBuyTarget] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const [courseRes, packRes] = await Promise.allSettled([
          apiFetch(`/api/v1/courses/${slug}`),
          apiFetch(`/api/v1/packs/${slug}`),
        ]);

        const courseData = courseRes.status === "fulfilled" ? courseRes.value?.data : null;
        const packData = packRes.status === "fulfilled" ? packRes.value?.data : null;

        if (courseData?.course) {
          setCourse(courseData.course);
        } else if (packData) {
          setPack(packData);
        } else {
          setError("Not found");
        }
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  const item = course
    ? { type: "course", id: course.id, title: course.title, price: course.price_in_paise }
    : pack
      ? { type: "pack", id: pack.id, title: pack.title, price: pack.price_in_paise }
      : null;

  const handleBuyClick = () => {
    if (item && (item.price || 0) >= 100) {
      setBuyTarget(item);
      setModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiBookOpen className="w-16 h-16 text-slate-600" />
          <p className="text-slate-400">Course or pack not found</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const modules = course?.modules || [];
  const pricePaise = item.price || 0;
  const canBuy = pricePaise >= 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-2xl border border-white/10 p-6 md:p-8",
            "bg-gradient-to-b from-white/5 to-transparent"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h1>
              {(course?.description || pack?.description) && (
                <p className="text-slate-400 text-base mb-4">
                  {course?.description || pack?.description}
                </p>
              )}
              {course && (
                <p className="text-slate-500 text-sm">
                  {modules.length} module{modules.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3 shrink-0">
              <span className="font-mono text-2xl font-semibold">{formatPrice(pricePaise)}</span>
              {canBuy ? (
                <button
                  onClick={handleBuyClick}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Get Course
                </button>
              ) : (
                <span className="text-slate-500 text-sm">Free or coming soon</span>
              )}
            </div>
          </div>

          {course && modules.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-lg font-semibold mb-4">Curriculum</h2>
              <ul className="space-y-3">
                {modules.map((mod, i) => (
                  <li key={mod.id || i} className="flex items-center gap-3 text-slate-300">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    {mod.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      <BuyNowModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={buyTarget}
        onSuccess={() => setModalOpen(false)}
      />
    </div>
  );
}

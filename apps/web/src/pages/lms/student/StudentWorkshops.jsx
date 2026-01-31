import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiCheckCircle,
  FiX,
  FiArrowLeft,
  FiVideo,
} from "react-icons/fi";

export default function StudentWorkshops() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchWorkshops();
  }, [token]);

  useEffect(() => {
    if (id && workshops.length > 0) {
      const workshop = workshops.find((w) => w.id === id);
      if (workshop) {
        setSelectedWorkshop(workshop);
      }
    }
  }, [id, workshops]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockWorkshops = [
        {
          id: "1",
          title: "Advanced React Patterns",
          instructor: "John Doe",
          date: new Date(Date.now() + 2592000000).toISOString(),
          duration: "3 hours",
          location: "Online",
          capacity: 50,
          registered: 32,
          description: "Learn advanced React patterns and best practices",
          topics: ["Hooks", "Context API", "Performance Optimization"],
        },
        {
          id: "2",
          title: "Node.js Backend Development",
          instructor: "Jane Smith",
          date: new Date(Date.now() + 3456000000).toISOString(),
          duration: "4 hours",
          location: "Hybrid",
          capacity: 30,
          registered: 18,
          description: "Build scalable backend applications with Node.js",
          topics: ["Express", "Database Design", "API Development"],
        },
      ];
      setWorkshops(mockWorkshops);
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (workshopId) => {
    if (!confirm("Are you sure you want to register for this workshop?")) return;
    try {
      // Mock register - replace with actual API call
      setRegisteredWorkshops([...registeredWorkshops, workshopId]);
      alert("Successfully registered for the workshop!");
    } catch (error) {
      alert("Failed to register");
      console.error("Failed to register:", error);
    }
  };

  if (loading) {
    return <GenericPageSkeleton />;
  }

  if (selectedWorkshop) {
    const isRegistered = registeredWorkshops.includes(selectedWorkshop.id);
    const isFull = selectedWorkshop.registered >= selectedWorkshop.capacity;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedWorkshop(null);
              navigate("/lms/student/workshops");
            }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Workshops
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-8 border-2 border-cyan-200/50 shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedWorkshop.title}
                </h1>
                <p className="text-lg text-slate-700">by {selectedWorkshop.instructor}</p>
              </div>
              {isRegistered && (
                <div className="px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-md flex items-center gap-2 text-emerald-600">
                  <FiCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Registered</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200">
                <FiCalendar className="w-5 h-5 text-cyan-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Date</p>
                <p className="font-semibold text-slate-800">
                  {new Date(selectedWorkshop.date).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-md border-2 border-emerald-200">
                <FiClock className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Duration</p>
                <p className="font-semibold text-slate-800">{selectedWorkshop.duration}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-md border-2 border-amber-200">
                <FiMapPin className="w-5 h-5 text-amber-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Location</p>
                <p className="font-semibold text-slate-800">{selectedWorkshop.location}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-md border-2 border-purple-200">
                <FiUsers className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Seats</p>
                <p className="font-semibold text-slate-800">
                  {selectedWorkshop.registered}/{selectedWorkshop.capacity}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Description</h3>
                <p className="text-slate-700">{selectedWorkshop.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkshop.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md text-sm font-semibold text-cyan-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {!isRegistered && (
                <button
                  onClick={() => handleRegister(selectedWorkshop.id)}
                  disabled={isFull}
                  className={`w-full px-6 py-4 font-semibold rounded-md transition-all shadow-lg ${
                    isFull
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                  }`}
                >
                  {isFull ? "Workshop Full" : "Register Now"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Workshops
          </h1>
          <p className="text-slate-600 text-lg">Join interactive learning sessions</p>
        </motion.div>

        {workshops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiCalendar className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No workshops available</h3>
            <p className="text-slate-500">Check back later for upcoming workshops</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => {
              const isRegistered = registeredWorkshops.includes(workshop.id);
              const isFull = workshop.registered >= workshop.capacity;
              return (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedWorkshop(workshop);
                    navigate(`/lms/student/workshops/${workshop.id}`);
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md text-white">
                      <FiCalendar className="w-6 h-6" />
                    </div>
                    {isRegistered && (
                      <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-semibold">
                        Registered
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2">{workshop.title}</h3>
                  <p className="text-slate-600 mb-4">by {workshop.instructor}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(workshop.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiClock className="w-4 h-4" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMapPin className="w-4 h-4" />
                      {workshop.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiUsers className="w-4 h-4" />
                      {workshop.registered}/{workshop.capacity} registered
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWorkshop(workshop);
                      navigate(`/lms/student/workshops/${workshop.id}`);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all"
                  >
                    {isRegistered ? "View Details" : isFull ? "Full" : "Register"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

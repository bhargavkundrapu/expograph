import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

export default function MentorCalendar() {
  const { user } = useAuth();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/meetings")) return "meetings";
    if (path.includes("/availability")) return "availability";
    return "schedule";
  };
  
  const view = getViewFromPath();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Mock events - in production, fetch from API
    setEvents([
      {
        id: 1,
        title: "Meeting with John Doe",
        start: new Date(2024, 0, 15, 10, 0),
        end: new Date(2024, 0, 15, 11, 0),
        type: "meeting",
      },
      {
        id: 2,
        title: "Review Session",
        start: new Date(2024, 0, 16, 14, 0),
        end: new Date(2024, 0, 16, 15, 30),
        type: "review",
      },
    ]);
  }, []);

  if (view === "schedule") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Calendar</h1>
            <button 
              onClick={() => {
                // TODO: Implement new event modal/form
                alert("Create event feature coming soon");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              New Event
            </button>
          </div>
          
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-lg">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-slate-700 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="text-center py-12">
              <FiCalendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Calendar view coming soon</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4" />
                          {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          {event.start.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const newTitle = prompt("Edit event title:", event.title);
                          if (newTitle && newTitle.trim()) {
                            setEvents(events.map(e => e.id === event.id ? { ...e, title: newTitle.trim() } : e));
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Edit event"
                      >
                        <FiEdit2 className="w-5 h-5 text-slate-600" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete event "${event.title}"?`)) {
                            setEvents(events.filter(e => e.id !== event.id));
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete event"
                      >
                        <FiTrash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          {view === "meetings" ? "Meetings" : "Availability"}
        </h1>
        <div className="bg-white rounded-md p-12 border border-slate-200 shadow-lg text-center">
          <FiCalendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">{view === "meetings" ? "Meetings management" : "Availability settings"} coming soon</p>
        </div>
      </div>
    </div>
  );
}

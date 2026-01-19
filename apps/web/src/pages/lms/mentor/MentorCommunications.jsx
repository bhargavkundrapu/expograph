import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import {
  FiMessageSquare,
  FiSend,
  FiBell,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiSearch,
  FiUser,
} from "react-icons/fi";

export default function MentorCommunications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/alerts")) return "alerts";
    if (path.includes("/notifications")) return "notifications";
    return "messages";
  };
  
  const view = getViewFromPath();
  const [messages, setMessages] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", body: "" });

  useEffect(() => {
    // Mock data - in production, fetch from API
    setMessages([
      { id: 1, from: "John Doe", subject: "Question about assignment", body: "Hi, I have a question...", timestamp: new Date(), unread: true },
      { id: 2, from: "Jane Smith", subject: "Feedback request", body: "Could you review my submission?", timestamp: new Date(), unread: false },
    ]);
    setAlerts([
      { id: 1, type: "warning", title: "Pending Review", message: "3 submissions awaiting review", timestamp: new Date() },
      { id: 2, type: "info", title: "New Assignment", message: "New assignment posted", timestamp: new Date() },
    ]);
    setNotifications([
      { id: 1, type: "submission", message: "New submission from John Doe", timestamp: new Date(), read: false },
      { id: 2, type: "deliverable", message: "Deliverable submitted", timestamp: new Date(), read: true },
    ]);
  }, []);

  if (view === "messages") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Messages</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
              <div className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === msg.id ? "bg-emerald-50 border-2 border-emerald-500" : "bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{msg.from}</span>
                      {msg.unread && <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>}
                    </div>
                    <p className="text-xs text-slate-600 truncate">{msg.subject}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
              {selectedMessage ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">{selectedMessage.subject}</h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="p-2 rounded-lg hover:bg-slate-100"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-slate-600">From: {selectedMessage.from}</p>
                    <p className="text-sm text-slate-600">Date: {selectedMessage.timestamp.toLocaleDateString()}</p>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-slate-700">{selectedMessage.body}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <textarea
                      placeholder="Type your reply..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mb-4"
                      rows={4}
                    />
                    <button 
                      onClick={() => {
                        // TODO: Implement send reply functionality
                        alert("Send reply feature coming soon");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <FiSend className="w-5 h-5" />
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FiMessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">Select a message to view</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "alerts") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Alerts</h1>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl p-6 border border-slate-200 shadow-lg ${
                  alert.type === "warning" ? "border-amber-200 bg-amber-50" : "border-blue-200 bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    alert.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                  }`}>
                    <FiAlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{alert.title}</h3>
                    <p className="text-slate-600">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-2">{alert.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "notifications") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Notifications</h1>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl p-6 border border-slate-200 shadow-lg ${
                  !notif.read ? "border-emerald-200 bg-emerald-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500">
                    <FiBell className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700">{notif.message}</p>
                    <p className="text-xs text-slate-500 mt-2">{notif.timestamp.toLocaleDateString()}</p>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

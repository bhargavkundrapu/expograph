import { Routes, Route, Navigate } from "react-router-dom";
import Academy from "./pages/Academy.jsx";
import Solutions from "./pages/Solutions.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/academy" replace />} />
      <Route path="/academy" element={<Academy />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="*" element={<div style={{ padding: 20 }}>404 - Page not found</div>} />
    </Routes>
  );
}

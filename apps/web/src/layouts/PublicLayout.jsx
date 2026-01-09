import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

/**
 * Premium Public Layout
 * For public pages like Academy, Solutions, Login
 * Features: Premium navbar, footer, responsive design
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-emerald-50/20">
      {/* Premium Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}

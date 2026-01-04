import { FaBuilding, FaCog, FaUsers } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../components/ui/Card";

export default function TenantAdminHome() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaBuilding className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl mb-2">TenantAdmin Portal</h1>
              <p className="section-body text-gray-300 text-lg">Welcome to the TenantAdmin dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <Card variant="elevated" className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
            <FaCog className="text-purple-400 text-xl" />
          </div>
          <CardTitle className="text-xl">Tenant Settings</CardTitle>
        </div>
        <CardDescription>Manage your tenant configuration and settings.</CardDescription>
      </Card>
    </div>
  );
}

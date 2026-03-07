import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./app/providers/AuthProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { DashboardPrefsProvider } from "./app/providers/DashboardPrefsProvider";
import { GamificationProvider } from "./app/providers/GamificationProvider";
import { InstallAppPrompt } from "./Components/InstallAppPrompt";

export default function App() {
  return (
    <ThemeProvider>
      <DashboardPrefsProvider>
        <GamificationProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            {/* Install app prompt — below-medium devices only; dismissible with 7-day cooldown */}
            <InstallAppPrompt />
          </AuthProvider>
        </GamificationProvider>
      </DashboardPrefsProvider>
    </ThemeProvider>
  );
}

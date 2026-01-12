import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import Button from "../Components/ui/Button";

export default function AppLayout() {
  const { user, role, logout, status } = useAuth();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/login", { replace: true });
  }

  // Show loading state if auth is still initializing
  if (status === "loading") {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <Link to="/academy">
            <span>
              ExpoGraph LMS
            </span>
          </Link>

          <div>
            <div>
              <div>
                <span>{user?.email || "user"}</span>
                <span>•</span>
                <span>{role || "role"}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onLogout}
            >
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

import AcademyPage from "../pages/academy/AcademyPage";

/**
 * Root / academy route — everyone sees the Academy landing page.
 * Logged-in users go to LMS when they click "LMS Portal" in the header.
 * Guests see "Login" and go to /login when they click it.
 */
export default function HomeOrRedirect() {
  return <AcademyPage />;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./index.css";
import App from "./App.jsx";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (import.meta.env.PROD && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: "production",
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div style={{ padding: 20 }}>Something went wrong.</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);

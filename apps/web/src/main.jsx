import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./index.css";
import App from "./App.jsx";

// Note: Cloudflare Stream analytics beacon 404 errors may appear in console Network tab.
// These are harmless analytics requests and don't affect video playback.
// Network errors can't be suppressed via JavaScript, but they're safe to ignore.

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

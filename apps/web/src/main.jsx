import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./index.css";
import App from "./App.jsx";

// Suppress harmless console errors from third-party services
// Note: Network tab 404s/500s from Cloudflare Stream analytics and Sentry can't be suppressed via JavaScript,
// but they're harmless and don't affect functionality. This handler suppresses console.error calls related to these.
const originalError = console.error;
console.error = (...args) => {
  const message = String(args[0] || '');
  // Suppress Cloudflare Stream analytics beacon errors
  if (message.includes('cloudflarestream.com') && (message.includes('beacon') || message.includes('404'))) {
    return; // Silently ignore these harmless analytics errors
  }
  // Suppress Sentry/Cloudflare Dash errors (harmless reporting failures)
  if (message.includes('sentry') || message.includes('platform.dash.cloudflare.com')) {
    return; // Silently ignore Sentry reporting errors
  }
  originalError.apply(console, args);
};

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (import.meta.env.PROD && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: "production",
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);

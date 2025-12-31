import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";

import "./index.css";
import App from "./App.jsx";

// 1) Read DSN from Vercel env (Vite style)
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

// 2) Start Sentry early (before render)
// We keep it production-only so dev errors don’t spam Sentry.
if (import.meta.env.PROD && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: "production"
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Optional but useful: catches React render errors */}
      <Sentry.ErrorBoundary fallback={<div style={{ padding: 20 }}>Something went wrong.</div>}>
        <App />
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);

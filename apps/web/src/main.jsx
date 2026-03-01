import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./index.css";
import App from "./App.jsx";

class GlobalErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error("[ErrorBoundary]", err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ color: "#666", marginBottom: "1rem" }}>An unexpected error occurred. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1.5rem", borderRadius: "0.375rem", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: "1rem" }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Suppress harmless console errors from third-party services and browser extensions
const originalError = console.error;
console.error = (...args) => {
  const message = String(args[0] || '');
  // Suppress Cloudflare Stream analytics beacon errors
  if (message.includes('cloudflarestream.com') && (message.includes('beacon') || message.includes('404'))) {
    return;
  }
  // Suppress Sentry/Cloudflare Dash errors (harmless reporting failures)
  if (message.includes('sentry') || message.includes('platform.dash.cloudflare.com')) {
    return;
  }
  // Suppress API connection refused (expected when API server is not running)
  if (message.includes('Cannot connect to API server') || message.includes('ERR_CONNECTION_REFUSED')) {
    return;
  }
  // Suppress Chrome extension messaging errors (e.g. "message channel closed before response")
  if ((message.includes('asynchronous response') && message.includes('message channel closed')) ||
      message.includes('message channel closed before a response was received') ||
      (message.includes('listener indicated') && message.includes('asynchronous response'))) {
    return;
  }
  originalError.apply(console, args);
};

// Suppress Spline 3D library internal logs (e.g. "updating from 115 to 121", "H0", "BV", etc.)
function isSplineNoise(args) {
  const full = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
  if (full.includes('updating from')) return true;
  if (args.length === 1) {
    const a = String(args[0]).trim();
    if (['H0', 'BV', 'start', 'load', 't'].includes(a)) return true;
  }
  return false;
}
// Suppress React DevTools suggestion and Three.js multi-instance warning (dev-only noise)
function isNoise(args) {
  const full = args.map((a) => String(a ?? '')).join(' ');
  if (isSplineNoise(args)) return true;
  if (full.includes('Download the React DevTools') || full.includes('React DevTools')) return true;
  if (full.includes('Multiple instances of Three.js')) return true;
  return false;
}
const originalLog = console.log;
const originalInfo = console.info;
const originalDebug = console.debug;
const originalWarn = console.warn;
console.log = (...args) => { if (!isNoise(args)) originalLog.apply(console, args); };
console.info = (...args) => { if (!isNoise(args)) originalInfo.apply(console, args); };
console.debug = (...args) => { if (!isNoise(args)) originalDebug.apply(console, args); };
console.warn = (...args) => { if (!isNoise(args)) originalWarn.apply(console, args); };

// Suppress unhandled promise rejections from browser extensions (e.g. React DevTools, ad blockers)
window.addEventListener('unhandledrejection', (event) => {
  const msg = event.reason?.message ?? String(event.reason ?? '');
  if (msg.includes('Cannot connect to API server') || msg.includes('ERR_CONNECTION_REFUSED')) {
    event.preventDefault();
    return false;
  }
  if ((msg.includes('asynchronous response') && msg.includes('message channel closed')) ||
      msg.includes('message channel closed before a response was received') ||
      msg.includes('listener indicated') && msg.includes('asynchronous response')) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (import.meta.env.PROD && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: "production",
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <Sentry.ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <App />
      </Sentry.ErrorBoundary>
    </GlobalErrorBoundary>
  </StrictMode>
);

/**
 * React Router errorElement: shows a friendly UI instead of the default
 * "Unexpected Application Error! / You can provide a way better UX..." message.
 * Handles route render errors and lazy chunk load failures (retry = reload).
 */
import { useRouteError, useNavigate } from "react-router-dom";
import ErrorFallbackUI from "../Components/common/ErrorFallbackUI";
import { isChunkLoadError, chunkLoadUserMessage } from "../utils/chunkLoadError";

function getFriendlyMessage(error) {
  if (isChunkLoadError(error)) {
    return chunkLoadUserMessage();
  }
  return "We hit a small bump. Try again-it usually works.";
}

export default function RouteErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();
  const isChunk = isChunkLoadError(error);

  const handleRetry = () => {
    if (isChunk) {
      window.location.reload();
      return;
    }
    navigate(0);
  };

  return (
    <ErrorFallbackUI
      title="Something went wrong"
      message={getFriendlyMessage(error)}
      onRetry={handleRetry}
      onGoHome={true}
    />
  );
}

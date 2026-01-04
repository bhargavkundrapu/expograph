import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <Card variant="elevated" className="p-8 animate-fadeIn">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-pink-500 shadow-lg shadow-red-500/30 flex-shrink-0">
          <FaExclamationTriangle className="text-white text-xl" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl mb-2 text-red-300">{title}</CardTitle>
          {message ? <CardDescription className="text-red-200/80">{message}</CardDescription> : null}
        </div>
      </div>
      {onRetry ? (
        <Button
          variant="gradient"
          size="md"
          icon={FaRedo}
          onClick={onRetry}
          type="button"
        >
          Retry
        </Button>
      ) : null}
    </Card>
  );
}
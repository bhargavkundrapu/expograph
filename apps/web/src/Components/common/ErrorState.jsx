import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <Card variant="elevated" className="p-6 sm:p-8 animate-fadeIn">
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 rounded-xl bg-red-500 shadow-medium flex-shrink-0">
          <FaExclamationTriangle className="text-white text-lg sm:text-xl" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl sm:text-2xl mb-2 text-red-700">{title}</CardTitle>
          {message ? <CardDescription className="text-red-600 text-sm sm:text-base">{message}</CardDescription> : null}
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

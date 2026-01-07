import { Link } from "react-router-dom";
import { FaInbox } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";

export default function EmptyState({ title = "Nothing here yet", message, ctaText, ctaTo }) {
  return (
    <Card variant="elevated" className="p-8 sm:p-12 text-center animate-fadeIn">
      <div className="inline-block p-4 sm:p-6 rounded-full bg-green-50 border border-green-200 mb-4 sm:mb-6">
        <FaInbox className="text-3xl sm:text-4xl text-green-600" />
      </div>
      <CardTitle className="text-xl sm:text-2xl mb-2 sm:mb-3">{title}</CardTitle>
      {message ? <CardDescription className="text-base sm:text-lg max-w-md mx-auto">{message}</CardDescription> : null}
      {ctaText && ctaTo ? (
        <div className="mt-6 sm:mt-8">
          <Link to={ctaTo}>
            <Button variant="gradient" size="lg">
              {ctaText}
            </Button>
          </Link>
        </div>
      ) : null}
    </Card>
  );
}

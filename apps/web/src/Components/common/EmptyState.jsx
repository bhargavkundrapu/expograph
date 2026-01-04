import { Link } from "react-router-dom";
import { FaInbox } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";

export default function EmptyState({ title = "Nothing here yet", message, ctaText, ctaTo }) {
  return (
    <Card variant="elevated" className="p-12 text-center animate-fadeIn">
      <div className="inline-block p-6 rounded-full bg-gray-900 border border-gray-800 mb-6">
        <FaInbox className="text-4xl text-gray-600" />
      </div>
      <CardTitle className="text-2xl mb-3">{title}</CardTitle>
      {message ? <CardDescription className="text-lg max-w-md mx-auto">{message}</CardDescription> : null}
      {ctaText && ctaTo ? (
        <div className="mt-8">
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
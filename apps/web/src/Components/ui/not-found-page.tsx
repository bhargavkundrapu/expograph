"use client";

import { FileQuestion, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./empty";
import { Button } from "./button";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8"
      style={{ color: "var(--text-secondary)" }}
    >
      <Empty className="max-w-md border-border bg-card px-8 py-12 text-foreground shadow-lg">
        <EmptyHeader>
          <div className="text-6xl sm:text-7xl font-bold text-primary/80 tracking-tighter mb-2">404</div>
          <EmptyMedia variant="icon" className="mb-2">
            <FileQuestion className="size-12 text-muted-foreground" strokeWidth={1.5} />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold text-foreground">
            Page not found
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-6">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="size-4" />
            Back to Home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

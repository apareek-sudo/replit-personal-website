import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="text-9xl font-bold text-muted mb-4">404</div>
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved to another location.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Link>
      </Button>
    </div>
  );
}

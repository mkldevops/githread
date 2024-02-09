"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="px-4">
      <Alert className="my-8" variant="destructive">
        <AlertTriangle />
        <AlertTitle>Your are not logged</AlertTitle>
        <AlertDescription>
          You need to be logged to access this page.
        </AlertDescription>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>
      </Alert>
    </div>
  );
}

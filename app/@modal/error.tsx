"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast("You need to be logged in to access this page");
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return null;
}

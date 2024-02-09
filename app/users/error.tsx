"use client"; // Error components must be Client Components

import { ErrorAlert } from "@/src/features/layout/ErrorAlert";
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
    <ErrorAlert
      title="User not found"
      description="The user you are looking for does not exist."
    />
  );
}

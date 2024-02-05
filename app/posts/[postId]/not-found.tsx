"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4">
      <Alert className="my-8" variant="destructive">
        <AlertTriangle />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          The post you are looking for does not exist.
        </AlertDescription>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>
      </Alert>
    </div>
  );
}

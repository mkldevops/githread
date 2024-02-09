import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ErrorAlert = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="px-4">
      <Alert className="my-8" variant="destructive">
        <AlertTriangle />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>
      </Alert>
    </div>
  );
};

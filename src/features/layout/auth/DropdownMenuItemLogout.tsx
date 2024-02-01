"use client";

import { Loader } from "@/components/ui/loader";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(() => signOut());
      }}
      asChild
    >
      <span>
        {isPending ? (
          <Loader className="mr-2 h-4 w-4" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        Log out
      </span>
    </DropdownMenuItem>
  );
};

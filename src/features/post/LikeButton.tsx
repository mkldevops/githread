"use client";

import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart } from "lucide-react";
import React from "react";
import { LikeAction } from "./like.action";

export const LikeButton = ({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked: boolean;
}) => {
  const [isPending, startTransition] = React.useTransition();

  return (
    <button
      className={clsx("rounded-md hover:bg-accent gap-1 flex items-center", {
        "text-red-500": isLiked,
      })}
      onClick={() => {
        startTransition(() => {
          LikeAction(postId);
        });
      }}
    >
      {isPending ? (
        <Loader size={20} />
      ) : (
        <Heart size={20} fill={isLiked ? "red" : "white"} />
      )}
    </button>
  );
};

import { PostPlaceholder } from "@/src/features/post/PostSkeleton";
import React from "react";

export default function loading() {
  return (
    <div className="divide-y divide-accent">
      {Array.from({ length: 20 }).map((_, i) => {
        return <PostPlaceholder key={i} />;
      })}
    </div>
  );
}

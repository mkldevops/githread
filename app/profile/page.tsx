import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import React from "react";
import { notFound } from "next/navigation";
import { Profile } from "../users/[userId]/Profile";
import { Post } from "@/src/features/post/Post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function page() {
  const session = await getAuthSession();
  const user = await getUserProfile(session.user.id);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/profile/edit"
          >
            Edit Profile
          </Link>
        </form>
      </Profile>

      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

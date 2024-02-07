import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import React from "react";
import { notFound } from "next/navigation";
import { Profile } from "../users/[userId]/Profile";

export default async function page() {
  const session = await getAuthSession();
  const user = await getUserProfile(session.user.id);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}

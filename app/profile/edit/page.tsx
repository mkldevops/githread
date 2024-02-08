import { getUserEdit } from "@/src/query/user.query";
import React from "react";
import { ProfileForm } from "./ProfilForm";
import { editProfile } from "./edit-profile.action";

export default async function page() {
  const user = await getUserEdit();

  return (
    <div className="h-full container flex items-center">
      <div className="bg-card border rounded-md border-border p-4 flex-1">
        <ProfileForm user={user} onSubmit={editProfile} />
      </div>
    </div>
  );
}

"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileFormType } from "./ProfilForm";

export const editProfile = async (values: ProfileFormType) => {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: values,
  });

  return "/profile";
};

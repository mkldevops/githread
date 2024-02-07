"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const isFollowingUser = async (userId: string) => {
  const user = await getUser();
  return await prisma.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: userId,
    },
    select: {
      id: true,
    },
  });
};

export const followUser = async (userId: string) => {
  const user = await getUser();
  const isFollowing = await isFollowingUser(userId);

  console.log({ isFollowing });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        id: isFollowing.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: user.id,
        followingId: userId,
      },
    });
  }

  console.log(`/users/${userId}`);

  revalidatePath(`/users/${userId}`);
};

"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const LikeAction = async (postId: string) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return;
  }

  const isLiked = await prisma.like.findFirst({
    where: {
      userId: session.user.id,
      postId,
    },
  });

  if (isLiked) {
    await prisma.like.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
  }

  revalidatePath(`/`);
  revalidatePath(`/posts/${postId}`);

  return;
};

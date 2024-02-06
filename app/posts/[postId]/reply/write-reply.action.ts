"use server";

import { WritePostFormValues } from "@/app/write/WritePostForm";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const createReply = async (
  postId: string,
  value: WritePostFormValues
) => {
  const user = await getUser();
  const post = await prisma.post.create({
    data: {
      content: value.content,
      userId: user.id,
      parentId: postId,
    },
  });

  revalidatePath(`/posts/${postId}`);

  return postId;
};

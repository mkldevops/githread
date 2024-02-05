"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { WritePostFormValues } from "./WritePostForm";

export const createPost = async (value: WritePostFormValues) => {
  console.log("I'm on the server! I'm creating a post!");
  const user = await getUser();
  const post = await prisma.post.create({
    data: {
      content: value.content,
      userId: user.id,
    },
  });

  return post.id;
};

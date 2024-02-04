import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getLatestPosts = (userId?: string) =>
  prisma.post.findMany({
    where: {
      parentId: null,
    },
    take: 20,
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          image: true,
          username: true,
          id: true,
          name: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
        where: {
          userId: userId ?? "error",
        },
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number];

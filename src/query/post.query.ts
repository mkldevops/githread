import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { userSelect } from "./user.query";

export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    user: {
      select: userSelect,
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
  } satisfies Prisma.PostSelect);

export const getLatestPosts = (userId?: string) =>
  prisma.post.findMany({
    where: {
      parentId: null,
    },
    take: 20,
    select: postSelectQuery(userId),
    orderBy: {
      createdAt: "desc",
    },
  });

export const getPostView = (id: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
      replies: { select: postSelectQuery(userId) },
      parent: { select: postSelectQuery(userId) },
    },
  });

export const getPost = (id: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
    },
  });

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number];

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import { postSelectQuery } from "./post.query";

export const userSelect = {
  id: true,
  name: true,
  username: true,
  emailVerified: true,
  email: true,
  image: true,
  link: true,
  bio: true,
  createdAt: true,
};

export const getUser = async () => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: userSelect,
  });

  return user;
};

export const getUserProfile = cache(async (userId: string) => {
  console.log("Fetching user profile");

  return await prisma.user.findFirstOrThrow({
    where: {
      OR: [{ id: userId }, { username: userId }],
    },
    select: {
      ...userSelect,
      _count: {
        select: {
          likes: true,
          followers: true,
          followeds: true,
        },
      },
      posts: {
        select: postSelectQuery(userId),
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
      followeds: {
        select: {
          follower: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
});

export const getUserEdit = async () => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  return await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: userSelect,
  });
};

export type User = NonNullable<Prisma.PromiseReturnType<typeof getUser>>;

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

export type UserEdit = NonNullable<
  Prisma.PromiseReturnType<typeof getUserEdit>
>;

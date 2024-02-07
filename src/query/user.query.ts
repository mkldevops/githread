import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./post.query";

const userSelect = {
  id: true,
  name: true,
  username: true,
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
  });

  return user;
};

export const getUserProfile = async (userId: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
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
};

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

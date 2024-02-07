import { UserAvatar } from "@/src/features/layout/user/UserAvatar";
import { UserProfile } from "@/src/query/user.query";
import Link from "next/link";
import { PropsWithChildren } from "react";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export const Profile = ({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) => {
  return (
    <div className="mt-4 container">
      <div className="flex gap-2 items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p>{user?.username}</p>
        </div>
        <UserAvatar user={user} size="lg" />
      </div>
      {user.bio ? (
        <p className="mt-4">{user.bio}</p>
      ) : (
        <p className="text-muted-foreground">no bio</p>
      )}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex -space-x-2">
          {user.followeds.map(({ follower }) => (
            <UserAvatar
              key={follower.id}
              user={follower}
              size="sm"
              className="border-2 border-background"
            />
          ))}
        </div>
        <p className="text-muted-foreground">{" • "}</p>
        <p className="text-muted-foreground">
          {user._count.followeds} followers
        </p>
        {user.link ? (
          <>
            <p className="text-muted-foreground">{" • "}</p>
            <Link
              className="text-muted-foreground hover:underline text-wrap"
              href={user.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {removeHttp(user.link)}
            </Link>
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
};

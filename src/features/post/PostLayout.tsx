import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { PostHome } from "@/src/query/post.query";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

type PostLayoutProps = PropsWithChildren<{
  user: PostHome["user"];
  postId?: string;
  createdAt?: Date;
  className?: string;
}>;

export const PostLayout = ({
  className,
  user,
  createdAt,
  postId,
  children,
}: PostLayoutProps) => {
  return (
    <div className={clsx(className, "flex w-full flex-row items-start p-4")}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username} />
        ) : null}
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <Link href={`/user/${user.id}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto">
              {user.username}
            </p>
            {createdAt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}

            <Button variant="link">
              <MoreHorizontal size={20} />
            </Button>
          </div>
        </Link>

        {children}
      </div>
    </div>
  );
};

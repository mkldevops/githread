import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { User } from "@/src/query/user.query";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { UserAvatar } from "../layout/user/UserAvatar";

type PostLayoutProps = PropsWithChildren<{
  user: User;
  createdAt?: Date;
  className?: string;
}>;

export const PostLayout = ({
  className,
  user,
  createdAt,
  children,
}: PostLayoutProps) => {
  return (
    <div className={clsx(className, "flex w-full flex-row items-start p-4")}>
      <UserAvatar user={user} size="default" />
      <div className="ml-4 flex w-full flex-col gap-2">
        <Link href={`/users/${user.id}`}>
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
type UserAvatarProps = {
  user: {
    id: string | null;
    username: string | null;
    image: string | null;
  };
  size: "default" | "lg" | "sm";
  className?: string;
};

export const UserAvatar = ({
  user,
  size = "default",
  className,
  ...props
}: UserAvatarProps) => {
  return (
    <Link href={`/users/${user.username}`}>
      <Avatar size={size} className={className} {...props}>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username ?? ""} />
        ) : null}
        <AvatarFallback>
          {user?.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

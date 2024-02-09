import { buttonVariants } from "@/components/ui/button";
import { PostHome } from "@/src/query/post.query";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { LikeButton } from "./LikeButton";
import { PostLayout } from "./PostLayout";

type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex gap-2 items-center">
        <LikeButton postId={post.id} isLiked={post.likes.length > 0} />
        <Link
          href={`/posts/${post.id}/reply`}
          className={buttonVariants({ variant: "link", size: "icon" })}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div>
        <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
          {post._count.likes} likes
        </Link>
        {" • "}
        <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
          {post._count.replies} replies
        </Link>
      </div>
    </PostLayout>
  );
};

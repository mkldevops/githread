import { Button, buttonVariants } from "@/components/ui/button";
import { PostHome } from "@/src/query/post.query";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PostLayout } from "./PostLayout";

type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="fle flex-col gap-2">
        <Button variant="ghost" size="icon">
          <Heart size={20} />
        </Button>
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

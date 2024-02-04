import { Button } from "@/components/ui/button";
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
      <Link href={`/post/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="fle flex-col gap-2">
        <Button variant="ghost" size="icon">
          <Heart size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle size={20} />
        </Button>
      </div>
      <div>
        <Link href={`/post/${post.id}`} className="text-sm text-foreground">
          {post._count.likes} likes
        </Link>
        {" • "}
        <Link href={`/post/${post.id}`} className="text-sm text-foreground">
          {post._count.replies} replies
        </Link>
      </div>
    </PostLayout>
  );
};

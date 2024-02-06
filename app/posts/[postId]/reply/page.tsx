import { WritePostForm } from "@/app/write/WritePostForm";
import { Post } from "@/src/features/post/Post";
import { getPost } from "@/src/query/post.query";
import { getUser } from "@/src/query/user.query";
import { createReply } from "./write-reply.action";

export default async function PostReplyPage({
  params,
}: {
  params: { postId: string };
}) {
  const user = await getUser();

  const post = await getPost(params.postId, user.id);

  if (!post) {
    throw new Error("Post   not found");
  }

  return (
    <div>
      <Post post={post} />
      <WritePostForm
        user={user}
        onSubmit={async (values) => {
          "use server";
          return createReply(post.id, values);
        }}
      />
    </div>
  );
}

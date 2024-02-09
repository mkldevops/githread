import { WriteModal } from "@/app/@modal/(.)write/WriteModal";
import { createReply } from "@/app/posts/[postId]/reply/write-reply.action";
import { getUser } from "@/src/query/user.query";

export default async function ModalWritePage({
  params,
}: {
  params: { postId: string };
}) {
  const user = await getUser();

  return (
    <div>
      <WriteModal
        path="reply"
        user={user}
        createPost={async (values) => {
          "use server";
          const reply = await createReply(params.postId, values);
          return reply;
        }}
      />
    </div>
  );
}

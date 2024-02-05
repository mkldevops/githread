import { getUser } from "@/src/query/user.query";
import { WriteModal } from "./WriteModal";
import { createPost } from "@/app/write/write-post.action";

export default async function ModalWritePage() {
  const user = await getUser();

  return (
    <div>
      <WriteModal user={user} createPost={createPost} />
    </div>
  );
}

import { getUser } from "@/src/query/user.query";
import { WritePostForm } from "./WritePostForm";

export default async function Write() {
  const user = await getUser();

  return (
    <WritePostForm
      user={user}
      onSubmit={async () => {
        "use server";
      }}
    />
  );
}

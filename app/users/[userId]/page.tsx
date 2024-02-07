import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { Post } from "@/src/features/post/Post";
import { getUserProfile } from "@/src/query/user.query";
import { notFound, redirect } from "next/navigation";
import { Profile } from "./Profile";
import { followUser, isFollowingUser } from "./follow.action";

export default async function page({ params }: { params: { userId: string } }) {
  const user = await getUserProfile(params.userId);
  const session = await getAuthSession();

  if (!user) {
    return notFound();
  }

  if (session?.user.id === user.id) {
    redirect("/profile");
  }

  const isFollowing = session?.user.id ? await isFollowingUser(user.id) : false;

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          <Button
            variant="outline"
            formAction={async () => {
              "use server";

              if (!session?.user.id) {
                return;
              }

              return followUser(user.id);
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </form>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

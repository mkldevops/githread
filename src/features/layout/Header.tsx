import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import Link from "next/link";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="border-b border-b-accent fixed top-0 bg-background w-full">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto">
          <Link href="/">Githread</Link>
        </h2>

        {session ? <UserProfile /> : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};

import { Button } from "./ui/button";
import Logo from "./logo";
import Link from "next/link";
import { requireUser } from "@/app/lib/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "@/app/lib/auth";
import MobileMenu from "./mobile-menu";
import Image from "next/image";

const Header = async () => {
  const session = await requireUser();
  return (
    <header className="flex items-center sm:justify-between max-sm:gap-5 my-6">
      <MobileMenu session={session} />
      <Logo />
      <div className="space-x-3 hidden sm:block">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:ring-2 ring-indigo-500 transition"
              >
                <Image
                  src={session?.user?.image as string}
                  alt="profile image"
                  width={20}
                  height={20}
                  className="w-full h-full rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/analytics">Analytics</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive" asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="w-full text-left">Log out</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/auth">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import { shadow } from "@/app/styles/utils";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/lib/supabase/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      {" "}
      <SidebarTrigger className="absolute top-1 left-1" />
      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/icon.png"
          alt="logo"
          height={60}
          width={60}
          className="rounded-full"
          priority
        ></Image>
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          <span>NOTES</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;

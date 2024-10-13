"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { useState } from "react";
import { Session } from "next-auth";
import { logout } from "@/app/lib/action";

const MobileMenu = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="sm:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="*:self-start">
          <SheetTitle asChild>
            <Logo className="text-lg" />
          </SheetTitle>
          <SheetDescription asChild>
            <p className="text-xs text-muted-foreground font-semibold italic">
              Shorten, Simplify, Share!
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-10 flex flex-col">
          {!session?.user ? (
            <Link
              href={"/auth"}
              onClick={handleClose}
              className="py-3 px-4 hover:bg-gray-100 transition w-full font-bold"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex flex-col">
              <Link
                href={"/"}
                onClick={handleClose}
                className="py-3 px-4 hover:bg-gray-100 transition w-full font-bold"
              >
                Generate
              </Link>
              <Link
                href={"/analytics"}
                onClick={handleClose}
                className="py-3 px-4 hover:bg-gray-100 transition w-full font-bold"
              >
                Analytics
              </Link>
              <button
                className="py-3 px-4 hover:bg-gray-100 transition w-full font-bold text-left text-red-500"
                onClick={async () => {
                  await logout();
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

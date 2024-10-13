import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <h1 className={cn("text-3xl font-bold", className)}>
        Short<span className="text-indigo-500">Path</span>
      </h1>
    </Link>
  );
};

export default Logo;

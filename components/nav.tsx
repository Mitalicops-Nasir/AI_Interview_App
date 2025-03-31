"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.actions";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={38} height={32} />

        <h2 className="text-primary-100">PrepInterview</h2>
      </Link>

      <div>
        <Button onClick={() => signOut()} className="btn-primary max-sm:w-full">
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Nav;

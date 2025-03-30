import Nav from "@/components/nav";
import { isAuthenticated, signOut } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const IsUserAuthenticated = await isAuthenticated();

  if (!IsUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <Nav />

      {children}
    </div>
  );
};

export default RootLayout;

"use client";

import { signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
  return (
    <button className="hover:cursor-pointer" onClick={() => signIn("google")}>
      Sign In
    </button>
  );
};

export const SignOutButton = () => {
  return (
    <button className="hover:cursor-pointer" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

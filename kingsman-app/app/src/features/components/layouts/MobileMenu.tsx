"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Session } from "next-auth";

import { SignInButton, SignOutButton } from "../ui/AuthButton";

type MobileMenuProps = {
  session: Session | null;
  cartCount: number;
};

export default function MobileMenu({ session, cartCount }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-2 transition hover:bg-neutral-100"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Menu */}
      <div
        className={`absolute left-0 top-20 w-full border-t border-neutral-200 bg-white shadow-xl transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 uppercase tracking-[0.15em]">
          <Link href="/" onClick={() => setOpen(false)} className="py-4">
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="py-4"
          >
            Shop
          </Link>

          <Link href="/contact" onClick={() => setOpen(false)} className="py-4">
            Contact
          </Link>

          {session && (
            <>
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="py-4"
              >
                Orders
              </Link>

              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4"
              >
                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-black px-2 py-1 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="my-5 flex items-center gap-3 border-t pt-5">
                <Image
                  src={session.user?.image ?? "/default-avatar.png"}
                  alt={session.user?.name ?? "User"}
                  width={42}
                  height={42}
                  className="rounded-full"
                />

                <div>
                  <p className="text-xs uppercase text-neutral-400">
                    Signed in as
                  </p>

                  <p className="text-sm normal-case">{session.user?.name}</p>
                </div>
              </div>

              <SignOutButton />
            </>
          )}

          {!session && <SignInButton />}
        </nav>
      </div>
    </div>
  );
}

"use server";

import Image from "next/image";
import Link from "next/link";

import prisma from "@/lib/prisma";

import { auth } from "../../auth/config/auth";
import { SignInButton, SignOutButton } from "../ui/AuthButton";

const Navbar = async () => {
  let cartCount = 0;

  const session = await auth();

  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    });

    cartCount =
      cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-light tracking-[0.35em] uppercase transition hover:opacity-70">
            Kingsman Co.
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 text-sm uppercase tracking-[0.18em] md:flex">
          <Link href="/" className="transition hover:text-neutral-500">
            Home
          </Link>

          <Link href="/products" className="transition hover:text-neutral-500">
            Shop
          </Link>

          <Link href="/contact" className="transition hover:text-neutral-500">
            Contact
          </Link>

          {session && (
            <Link href="/orders" className="transition hover:text-neutral-500">
              Orders
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {session ? (
            <>
              <Link
                href="/cart"
                className="relative transition hover:opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386a1.5 1.5 0 011.465 1.175l.716 3.221m0 0L7.5 15.75A1.5 1.5 0 008.965 17h8.535a1.5 1.5 0 001.465-1.175l1.785-8.029H5.817zM9 21a.75.75 0 100-1.5A.75.75 0 009 21zm9 0a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  />
                </svg>

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="hidden items-center gap-3 md:flex">
                <Image
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? "User"}
                  width={36}
                  height={36}
                  className="rounded-full"
                />

                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    Welcome
                  </span>

                  <span className="text-sm">{session?.user?.name}</span>
                </div>
              </div>

              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

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
      where: { userId: session?.user?.id },
      include: {
        items: true,
      },
    });
    cartCount =
      cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
  }

  return (
    <div className="sticky w-full z-10 mt-10 flex items-center justify-evenly p-5 list-none">
      {/* Logo */}
      <div>
        <h3 className="text-4xl cursor-pointer">Kingsman Co.</h3>
      </div>
      {/* Nav Links */}
      <div className="flex gap-5 text-2xl cursor-pointer">
        <Link href="/">
          <ul>
            <li>Home</li>
          </ul>
        </Link>
        <Link href="/products">
          <ul>
            <li>Shop</li>
          </ul>
        </Link>
        <Link href="/contact">
          <ul>
            <li>Contact</li>
          </ul>
        </Link>
        {/* Protected Routes (Session Dependen  t) */}
        {session?.user?.name ? (
          <>
            <Link href="/orders">
              <ul>
                <li> My Orders </li>
              </ul>
            </Link>
            {/* Cart */}
            <Link href="/cart">
              <ul>
                <li className="relative">
                  <span>🛒</span>
                  <span className="absolute -top-2 -right-2 text-sm">
                    {cartCount}
                  </span>
                </li>
              </ul>
            </Link>
            {/* User's Name */}
            <ul>
              <li className="flex gap-3">Hi {session.user.name}</li>
            </ul>
            {/* Logout Button */}
            <ul>
              <li>
                <div className="flex">
                  <Image
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <SignOutButton />
                </div>
              </li>
            </ul>
            {/* End of Protected Routes (Session Dependent) */}
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;

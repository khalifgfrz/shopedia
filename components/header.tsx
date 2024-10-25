"use client";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/next.svg";

export const revalidate = 0;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="bg-white border-b">
      <nav aria-label="Global" className="flex justify-between py-6 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image alt="" src={Logo} className="h-8 w-auto" />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="self-center flex lg:flex-1 lg:justify-end gap-5">
            <Link href="/cart" className="self-center font-bold leading-6 text-gray-900">
              <ShoppingCartIcon className="h-5 w-5" />
            </Link>
            <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
              Profile
            </Link>
          </div>
        ) : (
          <div className="self-center">
            <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

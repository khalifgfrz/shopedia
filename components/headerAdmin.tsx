"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/next.svg";

export const revalidate = 0;

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav aria-label="Global" className="flex justify-between py-6 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/admin" className="-m-1.5 p-1.5">
            <Image alt="" src={Logo} className="h-8 w-auto" />
          </Link>
        </div>
        <div className="self-center flex lg:flex-1 lg:justify-center gap-5">
          <Link href="/admin/order" className="text-sm font-semibold leading-6 text-gray-900">
            Order
          </Link>
          <Link href="/admin/user" className="text-sm font-semibold leading-6 text-gray-900">
            User
          </Link>
        </div>
        <div className="self-center flex lg:flex-1 lg:justify-end gap-5">
          <Link href="/admin/profile" className="text-sm font-semibold leading-6 text-gray-900">
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

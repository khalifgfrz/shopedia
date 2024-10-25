"use client";
import Link from "next/link";

export const revalidate = 0;

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav aria-label="Global" className="flex justify-between py-6 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/admin" className="-m-1.5 p-1.5">
            <img alt="" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="self-center flex lg:flex-1 lg:justify-center gap-5">
          <a href="/admin/order" className="text-sm font-semibold leading-6 text-gray-900">
            Order
          </a>
          <a href="/admin/user" className="text-sm font-semibold leading-6 text-gray-900">
            User
          </a>
        </div>
        <div className="self-center flex lg:flex-1 lg:justify-end gap-5">
          <a href="/admin/profile" className="text-sm font-semibold leading-6 text-gray-900">
            Profile
          </a>
        </div>
      </nav>
    </header>
  );
}

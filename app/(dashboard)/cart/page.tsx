"use client";

import CartCard from "@/components/cart/cart-card";
import { Cart } from "@/components/cart/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

function CartPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchCarts = async (page: number) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        router.push(`/auth/login`);
        return;
      }

      console.log(token);

      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/carts?page=${page}`;
        const res = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setCarts(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCarts(currentPage);
  }, [currentPage, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (page === 1) {
      router.push(`/`);
    } else {
      router.push(`/?page=${page}`);
    }
    setLoading(true);
  };

  return (
    <div>
      {carts.map((cart) => (
        <CartCard key={cart.id} cart={cart} />
      ))}
      <div className="pagination-controls flex justify-center gap-4 mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 disabled:opacity-50">
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading cart data...</p>}>
      <CartPage />
    </Suspense>
  );
}

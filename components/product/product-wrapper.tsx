// components/product/product-wrapper.tsx

"use client"; // Enables client-side behavior

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product/product-card";
import FilterWrapper from "./filter-wrapper";
import { FilterSettings, Product } from "@/components/product/types";
import { useRouter, useSearchParams } from "next/navigation";

const ProductWrapper: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    product_name: "",
    selectedCategories: [] as string[],
    sortBy: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const params = new URLSearchParams();
        if (filters.product_name) params.append("search", filters.product_name);
        if (filters.selectedCategories.length > 0) {
          filters.selectedCategories.forEach((category) => params.append("categoryName", category));
        }
        if (filters.sortBy) params.append("sort", filters.sortBy);

        params.append("page", page.toString());

        const URL = `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;
        const res = await fetch(URL);

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(currentPage);
  }, [currentPage, filters]);

  const handleApplyFilters = (newFilters: FilterSettings) => {
    setFilters(newFilters);
    router.push(`/`);
  };

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
      <FilterWrapper onApplyFilters={handleApplyFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
};

export default ProductWrapper;

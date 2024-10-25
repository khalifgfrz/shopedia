"use client"; // Enables client-side behavior

import { Product } from "@/components/product/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
        const res = await fetch(URL);

        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4 border flex flex-col gap-3">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <p>Price: Rp {product.price}</p>
      <p>Stock: {product.stock}</p>
      <div className="flex gap-3">
        <Button type="submit" className="w-full">
          {loading ? "Loading..." : "Buy"}
        </Button>
        <Button type="submit" className="w-full">
          {loading ? "Loading..." : "Cart"}
        </Button>
      </div>
    </div>
  );
}

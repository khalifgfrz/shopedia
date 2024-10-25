import { Product } from "./types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-4 border flex flex-col gap-3">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Link href={`/product/${product.id}`}>
        <Image src={product.image} alt={product.name} width={200} height={200} className="cursor-pointer" />
      </Link>
      <p>Rp {product.price}</p>
      <p>{product.categories.join(", ")}</p>
    </div>
  );
}

export default ProductCard;

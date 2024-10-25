import React from "react";
import { Cart } from "./types";
import Image from "next/image";

function CartCard({ cart }: { cart: Cart }) {
  return (
    <div className="p-4 border flex flex-col gap-3">
      <h1>{cart.productName}</h1>
      <Image src={cart.productImage} alt={cart.productName} width={200} height={200} />
      <p>{cart.qty}</p>
      <p>Rp {cart.price}</p>
    </div>
  );
}

export default CartCard;

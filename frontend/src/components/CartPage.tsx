import React from "react";

import Cart from "./Cart"; // your Cart component

const CartPage: React.FC = () => {
  const userId = "user1"; // Replace with logged-in user ID from context/auth

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <Cart userId={userId} />
    </div>
  );
};

export default CartPage;

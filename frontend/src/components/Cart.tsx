import React from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_CART, CHECKOUT } from "../graphql";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imgageUrl: string;
}

interface CartProps {
  userId: string;
}

const Cart: React.FC<CartProps> = ({ userId }) => {
  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: { userId },
  });

  const [checkout] = useMutation(CHECKOUT, {
    onCompleted: () => refetch(), // Refresh cart after checkout
  });

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  const cartItems: CartItem[] = data?.cart ?? [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    await checkout({ variables: { userId } });
  };

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

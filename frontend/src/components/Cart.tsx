import React from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_CART, CHECKOUT } from "../graphql";
import { useNavigate } from "react-router-dom";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartProps {
  userId: string;
}

const Cart: React.FC<CartProps> = ({ userId }) => {
  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: { userId },
  });
  const navigate = useNavigate();

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  const cartItems: CartItem[] = data?.cart ?? [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    // Navigate to checkout page with state
    navigate("/checkout", { state: { cartItems, total, userId } });
  };

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "20px",
              padding: "20px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "200px",
                  height: "250px",
                  gap: '5px'
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "100px", height: "auto" }}
                />
                <span>
                  {item.name}
                </span>
                <span>Quantity: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
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

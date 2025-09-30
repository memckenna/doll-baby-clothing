import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CHECKOUT, GET_CART } from "../graphql";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total, userId } = (location.state as any) || {};

  const [checkout] = useMutation(CHECKOUT, {
    refetchQueries: [{ query: GET_CART, variables: { userId } }],
    //   onCompleted: () => refetch(), // Refresh cart after checkout
  });

  const handleConfirm = async () => {
    const { data } = await checkout({ variables: { userId } });
    if (data?.checkout) {
      navigate("/order-confirmation", { state: { order: data.checkout } });
    }
  };

  if (!cartItems) {
    return <p>No cart data found. Go back to shop.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {cartItems.map((item: any) => (
          <li key={item.productId} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold">Total: ${total}</p>
      <button
        onClick={handleConfirm}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        style={{
          backgroundColor: "lightblue",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(26, 156, 243, 0.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "lightblue")
        }
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;

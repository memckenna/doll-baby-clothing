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
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "20px",
          borderBottom: "1px solid #ccc",
          width: '500px',
        }}
      >
        {cartItems.map((item: any) => (
          <div
            key={item.productId}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderTop: "1px solid #ccc",
              width: "500px",
              gap: "25px",
              paddingTop: "10px",
            }}
          >
            <div>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100px",
                  border: "1px, solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '10px' }}>
              <span>{item.name}</span>
              <span>Size: </span>
              <span>Quantity: {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px, solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          width: "500px",
          paddingBottom: '12px',
          paddingTop: '24px'
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total:</div>
        <div>${total.toFixed(2)}</div>
      </div>
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
          width: "500px",
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

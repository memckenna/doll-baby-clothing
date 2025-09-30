import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = (location.state as any) || {};

  if (!order) {
    return <p>No order found. Go back to shop.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-6">
        Your order ID is <strong>{order.id}</strong>.
      </p>

      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <div>
        {order.items.map((item: any) => (
          <div key={item.productId} className="flex justify-between">
            <span>
              {item.productId} x {item.quantity}
            </span>
            <span>${item.quantity * 20}</span>{" "}
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100px", height: "auto" }}
            />
            {/* replace with real price if needed */}
          </div>
        ))}
      </div>
      <p className="font-bold mb-6">Total: ${order.totalPrice.toFixed(2)}</p>

      <button
        onClick={() => navigate("/")}
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
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmationPage;

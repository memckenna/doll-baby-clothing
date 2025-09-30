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
      <p className="mb-6">Your order ID is <strong>{order.id}</strong>.</p>

      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4">
        {order.items.map((item: any) => (
          <li key={item.productId} className="flex justify-between">
            <span>
              {item.productId} x {item.quantity}
            </span>
            <span>${item.quantity * 20}</span> {/* replace with real price if needed */}
          </li>
        ))}
      </ul>

      <p className="font-bold mb-6">Total: ${order.totalPrice}</p>

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmationPage;

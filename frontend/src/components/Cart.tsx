import React from "react";

import { useQuery } from "@apollo/client";
import { GET_CART } from "../graphql";
import { Link, useNavigate } from "react-router-dom";

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
  const { data, loading, error } = useQuery(GET_CART, {
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
    <div style={{ width: "300px" }}>
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
              <Link
                key={item.productId}
                to={`/product/${item.productId}`}
                style={{ textDecoration: "none", color: "darkseagreen" }}
              >
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    width: "400px",
                    height: "250px",
                    gap: "5px",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "58px",
                    }}
                  >
                    <span style={{ paddingBottom: "12px" }}>{item.name}</span>
                    <span style={{ paddingBottom: "12px" }}>
                      Quantity: {item.quantity}
                    </span>
                    <span>
                      Price: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              paddingLeft: "20px",
              paddingBottom: "12px",
            }}
          >
            <div>Total:</div>
            <div>${total.toFixed(2)}</div>
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <button
              onClick={handleCheckout}
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
                width: "400px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(26, 156, 243, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "lightblue")
              }
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

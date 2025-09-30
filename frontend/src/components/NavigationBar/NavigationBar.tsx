import React from "react";
import { Link } from "react-router-dom";
import { GET_CART } from "../../graphql";
import { useQuery } from "@apollo/client";

interface NavigationBarProps {
    userId: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ userId }) => {
    const { data: cartData } = useQuery(GET_CART, {
        variables: {userId}
    });

    const cartCount = cartData?.cart?.length || 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "150px",
        backgroundColor: "darkseagreen",
        height: "50px",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        All Products
      </Link>
      <Link
        to="/new-arrivals"
        style={{ textDecoration: "none", color: "white" }}
      >
        New Arrivals
      </Link>
      <Link to="/boys" style={{ textDecoration: "none", color: "white" }}>
        Boys
      </Link>
      <Link to="/girls" style={{ textDecoration: "none", color: "white" }}>
        Girls
      </Link>
      <Link to="/gifts" style={{ textDecoration: "none", color: "white" }}>
        Gifts
      </Link>
      <div>
        <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
          Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "115px",
                right: "155px",
                background: "white",
                color: "black",
                borderRadius: "20%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;

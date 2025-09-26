import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <div style={{ color: "lightskyblue", fontSize: "20px" }}>
          <h1>The Modern Nursery</h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "150px",
          backgroundColor: 'darkseagreen',
          height: '50px'
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
        <Link
          to="/boys"
          style={{ textDecoration: "none", color: "white" }}
        >
          Boys
        </Link>
        <Link
          to="/girls"
          style={{ textDecoration: "none", color: "white" }}
        >
          Girls
        </Link>
        <Link
          to="/gender-neutral"
          style={{ textDecoration: "none", color: "white" }}
        >
          Gender Neutral
        </Link>
      </div>
    </div>
  );
};

export default Header;

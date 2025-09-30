import React from "react";
import NavigationBar from "./NavigationBar";

interface HeaderProps {
  userId: string;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  return (
    <div
      style={{
        // margin: "100px",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        gap: "150px",
        backgroundColor: "white",
        // height: "50px",
        position: "sticky", // <-- makes it stick
        top: 0, // <-- stick to top
        zIndex: 1000, // ensure it stays above content
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", }}
      >
        <div style={{ color: "lightskyblue", fontSize: "20px" }}>
          <h1>The Modern Nursery</h1>
        </div>
      </div>
      <NavigationBar userId={userId} />
    </div>
  );
};

export default Header;

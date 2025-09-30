import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../src/components/ProductPage";
import Cart from "./components/Cart";
import Header from "./components/NavigationBar/Header";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

const USER_ID = "user123";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProductPage userId={USER_ID} />} />
          <Route path="/boys" element={<ProductPage userId={USER_ID} category="Boys" />} />
          <Route path="/girls" element={<ProductPage userId={USER_ID} category="Girls" />} />
          <Route
            path="/gifts"
            element={<ProductPage userId={USER_ID} category="Gifts" />}
          />
          <Route
            path="/new-arrivals"
            element={<ProductPage userId={USER_ID} category="New Arrivals" />}
          />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/cart" element={<Cart userId={USER_ID}/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

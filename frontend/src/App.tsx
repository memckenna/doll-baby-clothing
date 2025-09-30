import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListPage from "./components/ProductListPage";
import Cart from "./components/Cart";
import Header from "./components/NavigationBar/Header";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import ProductDetailPage from "./components/ProductDetailPage";

const USER_ID = "user123";

function App() {
  return (
    <BrowserRouter>
      <Header userId={USER_ID} />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProductListPage userId={USER_ID} />} />
          <Route path="/boys" element={<ProductListPage userId={USER_ID} category="Boys" />} />
          <Route path="/girls" element={<ProductListPage userId={USER_ID} category="Girls" />} />
          <Route
            path="/gifts"
            element={<ProductListPage userId={USER_ID} category="Gifts" />}
          />
          <Route
            path="/new-arrivals"
            element={<ProductListPage userId={USER_ID} category="New Arrivals" />}
          />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/cart" element={<Cart userId={USER_ID}/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/product/:id" element={<ProductDetailPage userId={USER_ID} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  CHECKOUT,
  GET_ORDER_HISTORY,
} from "./graphql";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const USER_ID = "user123";

function App() {
  const { data: productData, loading: productLoading, error: productError } = useQuery(GET_PRODUCTS, {
    variables: { search: "" },
  });

  const { data: orderData, refetch: refetchOrders } = useQuery(GET_ORDER_HISTORY, {
    variables: { userId: USER_ID },
  });

  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [checkoutMutation] = useMutation(CHECKOUT);

  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = async (productId: string) => {
    const product = productData.products.find((p: any) => p.id === productId);
    await addToCartMutation({ variables: { userId: USER_ID, productId, quantity: 1 } });

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const handleCheckout = async () => {
    await checkoutMutation({ variables: { userId: USER_ID } });
    setCartItems([]); // clear local cart
    refetchOrders(); // refresh order history
    alert("Checkout complete!");
  };

  if (productLoading) return <p>Loading...</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList products={productData.products} onAddToCart={handleAddToCart} />

      <Cart cartItems={cartItems} onCheckout={handleCheckout} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Order History</h2>
        {orderData?.orderHistory?.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          <ul>
            {orderData.orderHistory.map((order: any) => (
              <li key={order.id} className="border p-2 rounded mb-2">
                <p>
                  <strong>Order ID:</strong> {order.id} | <strong>Status:</strong> {order.status} | <strong>Total:</strong> ${order.totalPrice}
                </p>
                <ul className="ml-4">
                  {order.items.map((item: any) => (
                    <li key={item.productId}>
                      {item.product.name} x {item.quantity} = ${item.product.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

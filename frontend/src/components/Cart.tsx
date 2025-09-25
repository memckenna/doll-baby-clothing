import React from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${total}</p>
          <button
            onClick={onCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;


// import { useMutation } from '@apollo/client';
// import { CHECKOUT } from '../graphql/mutations';

// const Cart = ({ userId, cartItems }: { userId: string; cartItems: any[] }) => {
//   const [checkout] = useMutation(CHECKOUT);

//   return (
//     <div>
//       {cartItems.map(item => (
//         <div key={item.productId}>
//           {item.productId} x {item.quantity}
//         </div>
//       ))}
//       <button onClick={() => checkout({ variables: { userId } })}>Checkout</button>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_PRODUCTS } from '../graphql/queries';
// import { ADD_TO_CART } from '../graphql/mutations';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded">
          <h3 className="font-bold">{product.name}</h3>
          {product.description && <p>{product.description}</p>}
          <p>${product.price}</p>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

// const ProductList = ({ userId }: { userId: string }) => {
//   const { data, loading } = useQuery(GET_PRODUCTS);
//   const [addToCart] = useMutation(ADD_TO_CART);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {data.products.map((product: any) => (
//         <div key={product.id} className="p-4 border rounded">
//           <h3 className="font-bold">{product.name}</h3>
//           <p>{product.description}</p>
//           <p>${product.price}</p>
//           <button
//             className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//             onClick={() =>
//               addToCart({ variables: { userId, productId: product.id, quantity: 1 } })
//             }
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_TO_CART, GET_CART, GET_PRODUCT } from "../graphql";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductDetailsPageProps {
  userId: string;
}

const ProductDetailPage: React.FC<ProductDetailsPageProps> = ({ userId }) => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { id } });

  const [confirmation, setConfirmation] = useState<string | null>(null);

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART, variables: { userId } }],
    onCompleted: (_) => {
      setConfirmation("Product added to cart!");

      setTimeout(() => setConfirmation(null), 2000);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product: Product = data.product;

  return (
    <div>
      {confirmation && (
        <div
          style={{
            position: "fixed", // stays in place on the screen
            top: "20px", // distance from top
            right: "20px", // distance from right
            backgroundColor: "lightblue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 9999, // make sure it's above other elements
            transition: "opacity 0.3s ease", // optional fade effect
          }}
        >
          {confirmation}
        </div>
      )}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "300px", objectFit: "contain" }}
        />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>{product.category}</p>
        <button
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
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(26, 156, 243, 0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "lightblue")
          }
          onClick={() =>
            addToCart({
              variables: { userId, productId: product.id, quantity: 1 },
            })
          }
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

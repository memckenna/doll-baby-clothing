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
  const [quantity, setQuantity] = useState<number>(0);

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART, variables: { userId } }],
    onCompleted: (_) => {
      setConfirmation("Product added to cart!");

      setTimeout(() => setConfirmation(null), 2000);
    },
  });

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q && q > 1 ? q - 1 : 1));

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
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "darkseagreen",
        }}
      >
        <div style={{ paddingRight: "100px" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "300px",
              objectFit: "contain",
              borderRadius: "5px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "darkseagreen",
          }}
        >
          <div style={{ fontSize: "24px" }}>{product.name}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ paddingRight: "12px", fontWeight: "bold" }}>
              Product Description:
            </div>
            <div>{product.description}</div>
          </div>
          <div style={{ paddingBottom: "100px", fontWeight: "bold" }}>
            ${product.price}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              paddingBottom: "12px",
            }}
          >
            <button
              onClick={decreaseQuantity}
              style={{
                backgroundColor: "darkseagreen",
                color: "white",
                border: "none",
                borderRadius: "30%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              onClick={increaseQuantity}
              style={{
                backgroundColor: "darkseagreen",
                color: "white",
                border: "none",
                borderRadius: "30%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              +
            </button>
          </div>
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
              (e.currentTarget.style.backgroundColor =
                "rgba(26, 156, 243, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "lightblue")
            }
            onClick={() =>
              addToCart({
                variables: { userId, productId: product.id, quantity },
              })
            }
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

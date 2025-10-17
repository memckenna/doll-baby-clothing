import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_CART, GET_CART, GET_PRODUCTS } from "../graphql";
import { useState } from "react";
import { Link } from "react-router-dom";

// const GET_PRODUCTS = gql`
//   query Products($category: String) {
//     products(category: $category) {
//       id
//       name
//       description
//       price
//       category
//       imageUrl
//     }
//   }
// `;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductPageProps {
  category?: string;
  userId?: string;
}

const ProductListPage = ({ category, userId }: ProductPageProps) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });

  const [confirmation, setConfirmation] = useState<string | null>(null);

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART, variables: { userId } }],
    onCompleted: (_) => {
      setConfirmation("Product added to cart!");

      setTimeout(() => setConfirmation(null), 2000);
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {data.products.map((product: Product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{textDecoration: 'none', color: 'darkseagreen'}}
            >
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "200px", height: "300px", objectFit: "contain" }}
              />
              <h2 style={{ fontWeight: "bold", marginBottom: "1px", alignSelf: "center" }}>
                {product.name}
              </h2>
              {/* <p style={{ marginBottom: "1px" }}>{product.description}</p> */}
              <p style={{ marginBottom: "10px" }}>${product.price}</p>
              {/* <p style={{ color: "#666", marginBottom: "8px" }}>
                {product.category}
              </p> */}
              {/* <button
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
                  (e.currentTarget.style.backgroundColor = 'rgba(26, 156, 243, 0.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'lightblue')
                }
                onClick={() =>
                  addToCart({
                    variables: { userId, productId: product.id, quantity: 1 },
                  })
                }
              >
                Add To Cart
              </button> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;

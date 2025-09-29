import { useQuery, gql, useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graphql";

const GET_PRODUCTS = gql`
  query Products($category: String) {
    products(category: $category) {
      id
      name
      description
      price
      category
      imageUrl
    }
  }
`;

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

const ProductPage = ({ category, userId }: ProductPageProps) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });

  const [addToCart] = useMutation(ADD_TO_CART);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.products.map((product: Product) => (
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
            style={{ width: "200px", height: "auto", objectFit: "contain" }}
          />
          <h2 style={{ fontWeight: "bold", marginBottom: "8px" }}>
            {product.name}
          </h2>
          <p style={{ marginBottom: "8px" }}>{product.description}</p>
          <p style={{ marginBottom: "8px" }}>${product.price}</p>
          {/* <p style={{ color: "#666", marginBottom: "8px" }}>
            {product.category}
          </p> */}
          <button
            style={{}}
            onClick={() => addToCart({variables: { userId, productId: product.id, quantity: 1 }})}
          >Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

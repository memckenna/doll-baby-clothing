import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String) {
    products(search: $search) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
  query GetOrderHistory($userId: String!) {
    orderHistory(userId: $userId) {
      id
      totalPrice
      status
      createdAt
      items {
        productId
        quantity
        product {
          name
          price
        }
      }
    }
  }
`;

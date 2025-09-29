import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String) {
    products(search: $search) {
      id
      name
      description
      price
      imageUrl
      category
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

export const GET_CART = gql`
  query GetCart($userId: ID!) {
    cart(userId: $userId) {
      productId
      name
      price
      quantity
      imageUrl
    }
  }
`;

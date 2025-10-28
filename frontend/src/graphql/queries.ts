import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Products($categories: [String!]) {
    products(categories: $categories) {
      id
      name
      description
      price
      categories
      imageUrl
      sizes
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
          sizes
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
      size
    }
  }
`;


export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      categories
      imageUrl
      sizes
    }
  }
`;

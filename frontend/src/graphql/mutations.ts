import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      productId
      quantity
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout($userId: ID!) {
    checkout(userId: $userId) {
      id
      totalPrice
      createdAt
      status
      items {
        productId
        name
        price
        quantity
        imageUrl
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: String!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;

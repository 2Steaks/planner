/** @format */

import { gql } from 'graphql-request';

export const CREATE_SHOPPING = gql`
  mutation CreateShopping($data: ShoppingInput!) {
    createShopping(data: $data) {
      id: _id
      week
      ingredients {
        amount
        name
        stock
        unit
      }
    }
  }
`;

export const GET_SHOPPING = gql`
  query FindShoppingByDate($week: String!) {
    findShoppingByDate(week: $week) {
      id: _id
      week
      ingredients {
        amount
        name
        stock
        unit
      }
    }
  }
`;

export const UPDATE_SHOPPING = gql`
  mutation UpdateShopping($id: ID!, $data: ShoppingInput!) {
    updateShopping(id: $id, data: $data) {
      id: _id
      week
      ingredients {
        amount
        name
        stock
        unit
      }
    }
  }
`;

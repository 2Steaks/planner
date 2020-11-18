/** @format */

import { gql } from 'graphql-request';

export const SHOPPING_INGREDIENTS_FRAGMENT = gql`
  fragment shoppingIngredientsProps on Shopping {
    ingredients {
      amount
      name
      stock
      unit
    }
  }
`;

export const SHOPPING_COMMON_FRAGMENT = gql`
  fragment shoppingCommonProps on Shopping {
    id: _id
    week
    ...shoppingIngredientsProps
  }
  ${SHOPPING_INGREDIENTS_FRAGMENT}
`;

export const CREATE_SHOPPING = gql`
  mutation CreateShopping($data: ShoppingInput!) {
    createShopping(data: $data) {
      ...shoppingCommonProps
    }
  }
  ${SHOPPING_COMMON_FRAGMENT}
`;

export const GET_SHOPPING = gql`
  query FindShoppingByDate($week: String!) {
    findShoppingByDate(week: $week) {
      ...shoppingCommonProps
    }
  }
  ${SHOPPING_COMMON_FRAGMENT}
`;

export const UPDATE_SHOPPING = gql`
  mutation UpdateShopping($id: ID!, $data: ShoppingInput!) {
    updateShopping(id: $id, data: $data) {
      ...shoppingCommonProps
    }
  }
  ${SHOPPING_COMMON_FRAGMENT}
`;

/** @format */

import { gql } from 'graphql-request';

export const USER_FRAGMENT = gql`
  fragment userProps on User {
    firstName
    lastName
    email
    avatar
    recipes
    plans
    shoppingLists
  }
`;

export const GET_USER = gql`
  query FindUser($email: String!) {
    findUserByEmail(email: $email) {
      id: _id
      calories
      firstName
      lastName
      email
      avatar
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      id: _id
      calories
      firstName
      lastName
      email
      avatar
    }
  }
`;

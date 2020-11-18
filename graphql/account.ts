/** @format */

import { gql } from 'graphql-request';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($data: AccountInput!) {
    createAccount(data: $data) {
      id: _id
    }
  }
`;

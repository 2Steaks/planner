/** @format */

import { gql } from 'graphql-request';

export const GET_TAGS = gql`
  query FindAllTags {
    allTags {
      data {
        id: _id
        name
      }
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($data: TagInput!) {
    createTag(data: $data) {
      id: _id
      name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation PartialUpdateTag($id: ID!, $data: PartialUpdateTagInput!) {
    partialUpdateTag(id: $id, data: $data) {
      id: _id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id: _id
    }
  }
`;

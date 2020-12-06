/** @format */

import { gql } from 'graphql-request';
import { RECIPE_COMMON_FRAGMENT, RECIPE_INGREDIENTS_FRAGMENT } from './recipe';

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

export const GET_TAG_BY_NAME = gql`
  query FindTagByName($name: String!, $limit: Int!, $page: String) {
    findTagByName(name: $name) {
      id: _id
      name
      recipes(_size: $limit, _cursor: $page) {
        data {
          ...recipeCommonProps
          ...recipeIngredientsProps
        }
        before
        after
      }
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
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

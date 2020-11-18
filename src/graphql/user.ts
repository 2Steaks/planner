/** @format */

import { gql } from 'graphql-request';
import { RECIPE_COMMON_FRAGMENT, RECIPE_INGREDIENTS_FRAGMENT } from './recipe';

export const USER_FRAGMENT = gql`
  fragment userProps on User {
    id: _id
    calories
    firstName
    lastName
    email
    avatar
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      ...userProps
    }
  }
  ${USER_FRAGMENT}
`;

export const PARTIAL_UPDATE_USER = gql`
  mutation PartialUpdateUser($id: ID!, $data: PartialUpdateUserInput!) {
    partialUpdateUser(id: $id, data: $data) {
      ...userProps
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER_FAVOURITE_RECIPES = gql`
  query FindFavouriteRecipesByUserId($id: ID!, $limit: Int!, $page: String) {
    findUserByID(id: $id) {
      favourites(_size: $limit, _cursor: $page) {
        after
        before
        data {
          ...recipeCommonProps
          ...recipeIngredientsProps
        }
      }
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
`;

export const GET_USER_OWN_RECIPES = gql`
  query FindOwnRecipesByUserId($id: ID!, $limit: Int!, $page: String) {
    findUserByID(id: $id) {
      recipes(_size: $limit, _cursor: $page) {
        after
        before
        data {
          ...recipeCommonProps
          ...recipeIngredientsProps
        }
      }
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
`;

export const IS_USER_FAVOURITE_RECIPE = gql`
  query FindFavouriteRecipeByRecipeId($id: ID!) {
    isUserFavouriteRecipeById(id: $id)
  }
`;

export const GET_AUTHOR = gql`
  query FindAuthorById($id: ID!, $limit: Int!, $page: String) {
    findUserByID(id: $id) {
      firstName
      lastName
      avatar
      recipes(_size: $limit, _cursor: $page) {
        after
        before
        data {
          ...recipeCommonProps
          ...recipeIngredientsProps
        }
      }
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
`;

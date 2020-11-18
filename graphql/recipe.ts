/** @format */

import { gql } from 'graphql-request';

export const INGREDIENT_FRAGMENT = gql`
  fragment ingredientProps on User {
    amount
    calories
    original
    name
    unit
  }
`;

export const GET_RECIPE = gql`
  query FindRecipe($id: ID!) {
    findRecipeByID(id: $id) {
      id: _id
      title
      description
      image
      ingredients {
        amount
        calories
        original
        name
        unit
      }
      method {
        instruction
      }
      recipes {
        id: _id
        image
        title
        description
        ingredients {
          calories
        }
        serving
        tags {
          data {
            name
          }
        }
      }
      serving
      tags {
        data {
          id: _id
          name
        }
      }
      author {
        id: _id
      }
    }
  }
`;

export const GET_RECIPES = gql`
  query FindAllRecipes {
    allRecipes {
      data {
        id: _id
        image
        title
        description
        ingredients {
          calories
        }
        serving
        tags {
          data {
            name
          }
        }
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($data: RecipeInput!) {
    createRecipe(data: $data) {
      id: _id
      title
      description
      image
      ingredients {
        amount
        calories
        original
        name
        unit
      }
      method {
        instruction
      }
      serving
      tags {
        data {
          id: _id
          name
        }
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $data: RecipeInput!) {
    updateRecipe(id: $id, data: $data) {
      id: _id
      title
      description
      image
      ingredients {
        amount
        calories
        original
        name
        unit
      }
      method {
        instruction
      }
      recipes {
        id: _id
        image
        title
        description
        ingredients {
          calories
        }
        serving
        tags {
          data {
            name
          }
        }
      }
      serving
      tags {
        data {
          id: _id
          name
        }
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id: _id
    }
  }
`;

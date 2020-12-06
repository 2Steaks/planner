/** @format */

import { gql } from 'graphql-request';

export const RECIPE_COMMON_FRAGMENT = gql`
  fragment recipeCommonProps on Recipe {
    id: _id
    title
    description
    image
    serving
  }
`;

export const RECIPE_AUTHOR_FRAGMENT = gql`
  fragment recipeAuthorProps on Recipe {
    author {
      id: _id
      firstName
      lastName
    }
  }
`;

export const RECIPE_INGREDIENTS_FRAGMENT = gql`
  fragment recipeIngredientsProps on Recipe {
    ingredients {
      amount
      calories
      original
      name
      unit
    }
  }
`;

export const RECIPE_TIPS_FRAGMENT = gql`
  fragment recipeTipsProps on Recipe {
    tips {
      text
    }
  }
`;

export const RECIPE_RELATED_FRAGMENT = gql`
  fragment recipeRelatedProps on Recipe {
    recipes {
      ingredients {
        calories
      }
      tags {
        data {
          name
        }
      }
      ...recipeCommonProps
      ...recipeAuthorProps
    }
  }
`;

export const GET_RECIPE = gql`
  query FindRecipe($id: ID!) {
    findRecipeByID(id: $id) {
      method {
        instruction
      }
      tags {
        data {
          id: _id
          name
        }
      }
      schedule(_size: 1) {
        data {
          id: _id
        }
      }
      ...recipeCommonProps
      ...recipeAuthorProps
      ...recipeIngredientsProps
      ...recipeTipsProps
      ...recipeRelatedProps
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_AUTHOR_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
  ${RECIPE_TIPS_FRAGMENT}
  ${RECIPE_RELATED_FRAGMENT}
`;

export const GET_RECIPES = gql`
  query FindAllRecipes {
    allRecipes {
      data {
        ingredients {
          calories
        }
        tags {
          data {
            name
          }
        }
        ...recipeCommonProps
        ...recipeAuthorProps
      }
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_AUTHOR_FRAGMENT}
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($data: RecipeInput!) {
    createRecipe(data: $data) {
      method {
        instruction
      }
      tags {
        data {
          id: _id
          name
        }
      }
      ...recipeCommonProps
      ...recipeAuthorProps
      ...recipeIngredientsProps
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_AUTHOR_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $data: RecipeInput!) {
    updateRecipe(id: $id, data: $data) {
      method {
        instruction
      }
      tags {
        data {
          id: _id
          name
        }
      }
      ...recipeCommonProps
      ...recipeAuthorProps
      ...recipeIngredientsProps
      ...recipeRelatedProps
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_AUTHOR_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
  ${RECIPE_RELATED_FRAGMENT}
`;

export const PARTIAL_UPDATE_RECIPE = gql`
  mutation PartialUpdateRecipe($id: ID!, $data: PartialUpdateRecipeInput!) {
    partialUpdateRecipe(id: $id, data: $data) {
      method {
        instruction
      }
      tags {
        data {
          id: _id
          name
        }
      }
      ...recipeCommonProps
      ...recipeAuthorProps
      ...recipeIngredientsProps
      ...recipeRelatedProps
    }
  }
  ${RECIPE_COMMON_FRAGMENT}
  ${RECIPE_AUTHOR_FRAGMENT}
  ${RECIPE_INGREDIENTS_FRAGMENT}
  ${RECIPE_RELATED_FRAGMENT}
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id: _id
    }
  }
`;

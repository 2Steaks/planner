/** @format */

import { gql } from 'graphql-request';

export const CREATE_PLAN = gql`
  mutation CreatePlan($data: PlanInput!) {
    createPlan(data: $data) {
      id: _id
      week
      schedule {
        data {
          day
          meal
          plan {
            id: _id
          }
          recipe {
            id: _id
            image
            ingredients {
              calories
            }
            serving
            title
          }
        }
      }
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($id: ID!, $data: PlanInput!) {
    updatePlan(id: $id, data: $data) {
      id: _id
      week
      schedule {
        data {
          day
          meal
          plan {
            id: _id
          }
          recipe {
            id: _id
            image
            ingredients {
              calories
            }
            serving
            title
          }
        }
      }
    }
  }
`;

export const GET_PLANS_SORTED_BY_WEEK = gql`
  query FindAllPlansSortedByWeek($limit: Int!, $page: String) {
    allPlansSortedByWeek(_size: $limit, _cursor: $page) {
      data {
        id: _id
        week
        schedule {
          data {
            id: _id
            day
            meal
            plan {
              id: _id
            }
            recipe {
              id: _id
              ingredients {
                calories
              }
              serving
              title
            }
          }
        }
      }
      before
      after
    }
  }
`;

export const GET_PLAN = gql`
  query FindPlanByDate($week: String!) {
    findPlanByDate(week: $week) {
      id: _id
      week
      schedule {
        data {
          id: _id
          day
          meal
          plan {
            id: _id
          }
          recipe {
            id: _id
            image
            ingredients {
              calories
            }
            serving
            title
          }
        }
      }
    }
  }
`;

export const GET_PLAN_RECIPES = gql`
  query FindPlanByDate($week: String!) {
    findPlanByDate(week: $week) {
      schedule {
        data {
          recipe {
            id: _id
            ingredients {
              amount
              unit
              name
            }
          }
        }
      }
    }
  }
`;

/** @format */

import { gql } from 'graphql-request';

export const PLAN_SCHEDULE_FRAGMENT = gql`
  fragment planScheduleProps on Plan {
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
`;

export const PLAN_COMMON_FRAGMENT = gql`
  fragment planCommonProps on Plan {
    id: _id
    week
    ...planScheduleProps
  }
  ${PLAN_SCHEDULE_FRAGMENT}
`;

export const CREATE_PLAN = gql`
  mutation CreatePlan($data: PlanInput!) {
    createPlan(data: $data) {
      ...planCommonProps
    }
  }
  ${PLAN_COMMON_FRAGMENT}
`;

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($id: ID!, $data: PlanInput!) {
    updatePlan(id: $id, data: $data) {
      ...planCommonProps
    }
  }
  ${PLAN_COMMON_FRAGMENT}
`;

export const GET_PLANS_SORTED_BY_WEEK = gql`
  query FindAllPlansSortedByWeek($limit: Int!, $page: String) {
    allPlansSortedByWeek(_size: $limit, _cursor: $page) {
      data {
        ...planCommonProps
      }
      before
      after
    }
  }
  ${PLAN_COMMON_FRAGMENT}
`;

export const GET_PLAN = gql`
  query FindPlanByDate($week: String!) {
    findPlanByDate(week: $week) {
      ...planCommonProps
    }
  }
  ${PLAN_COMMON_FRAGMENT}
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
            serving
          }
          serving
        }
      }
    }
  }
`;

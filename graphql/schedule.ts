/** @format */

import { gql } from 'graphql-request';

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($data: ScheduleInput!) {
    createSchedule(data: $data) {
      id: _id
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: ID!, $data: ScheduleInput!) {
    updateSchedule(id: $id, data: $data) {
      id: _id
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id) {
      id: _id
    }
  }
`;

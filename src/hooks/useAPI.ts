/** @format */

import { useQuery, useMutation } from 'react-query';
import { request } from 'graphql-request';

type GraphQueryKeyType = string | [string, any];
export const useGraphQuery = (
  key: GraphQueryKeyType,
  graph: string,
  options = {}
) => {
  const defaults = {
    staleTime: 20000
  };

  const config = {
    ...defaults,
    ...options
  };

  return useQuery(
    key,
    (_, params) => request('/api/graphql', graph, params),
    config
  );
};

export const useGraphMutation = (graph: string, options = {}) => {
  const defaults = {};

  const config = {
    ...defaults,
    ...options
  };

  return useMutation(
    (params) => request('/api/graphql', graph, params),
    config
  );
};

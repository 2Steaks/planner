/** @format */
import { query as q } from 'faunadb';

const matchUserByEmail = (email: string) =>
  q.Match(q.Index('unique_User_email'), q.Casefold(email));

export const getUserByEmail = (email: string) => q.Get(matchUserByEmail(email));

export const isExistingUserByEmail = (email: string) =>
  q.Exists(matchUserByEmail(email));

export const createFaunaUser = (data: any) =>
  q.Create(q.Collection('User'), {
    data
  });

export const createFaunaUserMeta = async (user: any) => {
  return q.Create(q.Collection('PlanList'), {
    data: {
      count: 0,
      plans: [],
      owner: q.Select('ref', user)
    }
  });
};

export const getFaunaToken = (user: any) =>
  q.Create(q.Tokens(), { instance: q.Select('ref', user) });

export const getFaunaIdentity = q.Get(q.Identity());

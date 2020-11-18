/** @format */

import faunadb from 'faunadb';

export function getClient(secret: string) {
  return new faunadb.Client({ secret });
}

export const faunaGuestClient = getClient(
  process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET as string
);

export const faunaAdminClient = getClient(
  process.env.FAUNA_ADMIN_SECRET as string
);

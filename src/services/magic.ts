/** @format */

import { Magic } from 'magic-sdk';
import { Magic as MagicAdmin } from '@magic-sdk/admin';

export const getMagicGuest = () =>
  new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string);

export const magicAdmin = new MagicAdmin(process.env.MAGIC_SECRET_KEY);

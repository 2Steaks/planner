/** @format */

import React from 'react';
import { prop } from 'ramda';
import { AuthContextProps, useAuth } from '@project/context';
import { MenuBar as BaseMenuBar } from '@project/components/organisms/MenuBar';

export const MenuBar = () => {
  const { isAuthenticated, user } = useAuth() as AuthContextProps;

  return (
    <BaseMenuBar
      avatar={prop<string, any>('avatar', user)}
      isAuthenticated={isAuthenticated}
    />
  );
};

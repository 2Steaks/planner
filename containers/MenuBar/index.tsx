/** @format */

import React, { FunctionComponent } from 'react';
import { prop } from 'ramda';
import { UserType } from '@project/types';
import { useAuth } from '@project/context';
import { MenuBar as BaseMenuBar } from '@project/components/organisms/MenuBar';

export const MenuBar: FunctionComponent = () => {
  const { isAuthenticated, user } = useAuth() as {
    isAuthenticated: boolean;
    user: UserType;
  };

  return (
    <BaseMenuBar
      avatar={prop('avatar', user)}
      isAuthenticated={isAuthenticated}
    />
  );
};

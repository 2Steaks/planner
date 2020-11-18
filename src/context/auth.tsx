/** @format */

import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { UserType } from '@project/types/User';
import {
  isDefined,
  userLogin,
  userLogout,
  userSignup
} from '@project/services';
import { Login, PublicLayout } from '@project/components';

export type SessionProps = UserType | undefined | null;

type ProviderProps = { children: ReactNode; session: SessionProps };

export interface AuthContextProps {
  login: (x: SessionProps) => void;
  logout: () => void;
  signup: (x: SessionProps) => void;
  isAuthenticated: boolean;
  user: SessionProps;
  setUser: (x: SessionProps) => void;
}

const Context = createContext<Partial<AuthContextProps>>({});

const AuthProvider = ({ children, session }: ProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<SessionProps>(session);

  const [signup] = useMutation(userSignup, {
    onSuccess: setUser
  });

  const [login] = useMutation(userLogin, {
    onSuccess: setUser
  });

  const [logout] = useMutation(userLogout, {
    onSuccess: router.reload
  });

  const context = {
    login,
    logout,
    signup,
    isAuthenticated: Boolean(user),
    user,
    setUser
  } as any;

  if (!context.isAuthenticated) {
    return (
      <PublicLayout>
        <Login {...context} />
      </PublicLayout>
    );
  }

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useAuth = () => {
  const state = useContext(Context);

  if (!isDefined(state)) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return state;
};

export { AuthProvider, useAuth };

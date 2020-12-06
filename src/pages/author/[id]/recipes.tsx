/** @format */

import React from 'react';
import { useAuth } from '@project/context';
import { NextPage, NextPageContext } from 'next';
import { getRouteId } from '@project/services';
import { Author, PrivateLayout, PublicLayout } from '@project/components';

interface AuthorProps {
  id: string;
}

const AuthorPage: NextPage<AuthorProps> = ({ id }: AuthorProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Author id={id} />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <Author id={id} />
    </PrivateLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: getRouteId(context)
    }
  };
}

export default AuthorPage;

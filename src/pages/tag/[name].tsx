/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { path } from 'ramda';
import { useAuth } from '@project/context';
import { PrivateLayout, PublicLayout, TagRecipes } from '@project/components';

interface TagPageProps {
  name: string;
}

const TagPage: NextPage<TagPageProps> = ({ name }: TagPageProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <TagRecipes name={name} />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <TagRecipes name={name} />
    </PrivateLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      name: path(['query', 'name'], context)
    }
  };
}

export default TagPage;

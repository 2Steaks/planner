/** @format */

import React, { FunctionComponent, useEffect, useState } from 'react';
import { equals, ifElse, prop } from 'ramda';
import { UserType } from '@project/types';
import { GET_RECIPE } from '@project/graphql';
import { createRecipeQuery } from '@project/services';
import { useAuth } from '@project/context';
import { useGraphQuery } from '@project/hooks';
import { ErrorBoundary, ErrorFallback } from '@project/components';
import RecipeEditPage from './Edit';
import RecipeViewPage from './View';
import { getAuthorId, getId, getRecord } from './model';

interface RecipePageProps {
  id?: string;
}

/**
 *
 *
 * @returns
 */
const RecipePage: FunctionComponent<RecipePageProps> = ({
  id
}: RecipePageProps) => {
  const { user } = useAuth() as { user: UserType };
  const hasRecord = Boolean(id);

  const [isEditing, setIsEditing] = useState(!hasRecord);

  const { data, error, isLoading, refetch } = useGraphQuery(
    [`recipe/${id}`, createRecipeQuery({ id, author: getId(user) })],
    GET_RECIPE,
    { enabled: hasRecord, staleTime: Infinity }
  );

  const record = getRecord(data) as any;
  const isAuthor = equals(getId(user), getAuthorId(record));
  const Component = ifElse(prop('isEditing'), RecipeEditPage, RecipeViewPage);

  useEffect(() => {
    const Navigator = window.navigator as any;
    let wakeLock: any;

    (async () => {
      try {
        wakeLock = await Navigator.wakeLock.request('screen');
      } catch (err) {
        console.error(err);
      }
    })();

    return wakeLock?.release;
  }, []);

  if (hasRecord && isLoading) return <p>Loading...</p>;
  if (hasRecord && error) return <p>Error :(</p>;

  return (
    <ErrorBoundary fallback={ErrorFallback} key={record.id}>
      <Component
        hasRecord={hasRecord}
        isEditing={isEditing}
        isAuthor={isAuthor}
        onCancel={() => setIsEditing(false)}
        onComplete={() => setIsEditing(false)}
        onEdit={() => setIsEditing(true)}
        refetch={refetch}
        record={record}
      />
    </ErrorBoundary>
  );
};

export default RecipePage;

/** @format */
import React, { FunctionComponent } from 'react';
import { useQueryCache } from 'react-query';
import { UserType } from '@project/types';
import {
  IS_USER_FAVOURITE_RECIPE,
  PARTIAL_UPDATE_USER
} from '@project/graphql';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import { createPartialUserQuery } from '@project/services';
import { Favourite } from '@project/components/molecules/Favourite';
import { isFavourite } from './model';

export interface FavouriteRecipeProps {
  id: string;
}

export const FavouriteRecipe: FunctionComponent<FavouriteRecipeProps> = ({
  id
}: FavouriteRecipeProps) => {
  const { user } = useAuth() as { user: UserType };
  const queryCache = useQueryCache();

  const { data } = useGraphQuery(
    [`favourite-recipes/${id}`, { id }],
    IS_USER_FAVOURITE_RECIPE
  );

  const [updateUser] = useGraphMutation(PARTIAL_UPDATE_USER, {
    onSuccess: () => {
      queryCache.invalidateQueries(`favourite-recipes`);
      queryCache.invalidateQueries(`favourite-recipes/${id}`);
    }
  });

  function handleClick() {
    const connection = isFavourite(data)
      ? { disconnectFavourite: id }
      : { connectFavourite: id };

    updateUser(createPartialUserQuery({ id: user.id, ...connection }));
  }

  return <Favourite isActive={isFavourite(data)} onClick={handleClick} />;
};

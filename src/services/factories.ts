/** @format */

import { RecipeType, TagType } from '@project/types';

export type createPlanQueryProps = {
  id?: string;
  week: string;
  schedule?: [];
  owner: string;
};

export type createRecipeQueryProps = RecipeType & {
  plan?: string;
  recipes?: string[];
  connectTags?: string[];
  createTags?: TagType[];
  disconnectTags?: string[];
};

export type createScheduleQueryProps = {
  id?: string;
  day?: string;
  meal?: string;
  plan?: string;
  recipe?: string;
  serving?: number;
  owner?: string;
};

export type createShoppingQueryProps = {
  id?: string;
  ingredients: {
    amount: number;
    name: string;
    stock: string;
    unit: string;
  }[];
  week: string;
  owner: string;
};

export type createTagQueryProps = {
  id?: string;
  name?: string;
  connectRecipe?: string;
  disconnectRecipe?: string;
};

export type createUserQueryProps = {
  id?: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  calories?: number | string;
  connectFavourite?: string;
  disconnectFavourite?: string;
};

type OptionProps = { label: string; value: string | number };

type ConnectTypes = {
  connect?: any | any[] | undefined;
  create?: any | any[] | undefined;
  disconnect?: any | any[] | undefined;
};

// createConnections :: Object -> Object | Undefined
const createConnections = ({
  connect,
  create,
  disconnect
}: ConnectTypes): any => {
  const hasConnections =
    Boolean(create) || Boolean(connect) || Boolean(disconnect) || undefined;

  return (
    hasConnections && {
      connect,
      create,
      disconnect
    }
  );
};

// createRecipeQuery :: Object -> Object
export const createRecipeQuery = ({
  id,
  author,
  calories,
  description,
  image,
  ingredients,
  method,
  plan,
  recipes,
  serving,
  createTags,
  connectTags,
  disconnectTags,
  title
}: createRecipeQueryProps): any => ({
  id,
  data: {
    calories,
    description,
    image,
    ingredients,
    method,
    plan,
    serving,
    recipes,
    tags: createConnections({
      connect: connectTags,
      create: createTags,
      disconnect: disconnectTags
    }),
    title,
    author: createConnections({
      connect: author
    })
  }
});

// createTagQuery :: Object -> Object
export const createTagQuery = ({
  id,
  name,
  connectRecipe,
  disconnectRecipe
}: createTagQueryProps): any => ({
  id,
  data: {
    name,
    recipe: createConnections({
      connect: connectRecipe,
      disconnect: disconnectRecipe
    })
  }
});

// createPlanQuery :: Object -> Object
export const createPlanQuery = ({
  id,
  week,
  schedule,
  owner
}: createPlanQueryProps): any => ({
  id,
  data: {
    week,
    schedule,
    owner: {
      connect: owner
    }
  }
});

// createScheduleQuery :: Object -> Object
export const createScheduleQuery = ({
  id,
  day,
  meal,
  plan,
  recipe,
  serving,
  owner
}: createScheduleQueryProps): any => ({
  id,
  data: {
    day,
    meal,
    serving,
    recipe: {
      connect: recipe
    },
    plan: {
      connect: plan
    },
    owner: {
      connect: owner
    }
  }
});

// createShoppingQuery :: Object -> Object
export const createShoppingQuery = ({
  id,
  ingredients,
  week,
  owner
}: createShoppingQueryProps): any => ({
  id,
  data: {
    ingredients,
    week,
    owner: {
      connect: owner
    }
  }
});

export const createUserQuery = ({
  id,
  avatar,
  email,
  firstName,
  lastName,
  calories,
  connectFavourite,
  disconnectFavourite
}: createUserQueryProps): any => ({
  id,
  data: {
    avatar,
    email,
    firstName,
    lastName,
    calories,
    favourites: createConnections({
      connect: connectFavourite,
      disconnect: disconnectFavourite
    })
  }
});

export const createPartialUserQuery = ({
  id,
  connectFavourite,
  disconnectFavourite,
  ...props
}: createUserQueryProps): any => ({
  id,
  data: {
    favourites: createConnections({
      connect: connectFavourite,
      disconnect: disconnectFavourite
    }),
    ...props
  }
});

// createOption :: Object -> Object
export const createOption = ({ label, value }: OptionProps): any => (
  x: string
) => ({
  label: x[label],
  value: x[value]
});

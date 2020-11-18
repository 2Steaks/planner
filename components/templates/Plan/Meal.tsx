/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useGraphMutation } from '@project/hooks';
import {
  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE
} from '@project/graphql';
import { UserType } from '@project/types';
import { createScheduleQuery } from '@project/services';
import { useAuth } from '@project/context';
import { RecipeTile } from '@project/components';
import { getId, getMeal, getMeals, getRecipe } from './model';

export interface MealProps {
  day: string;
  refetch: () => void;
  schedule: any;
  onSavePlan: () => any;
  type: string;
}

export const Meal: FunctionComponent<MealProps> = ({
  day,
  refetch,
  schedule,
  onSavePlan,
  type
}: MealProps) => {
  const router = useRouter();
  const { user } = useAuth() as { user: UserType };
  const meals = getMeals(day, schedule);
  const meal = getMeal(type, meals) as any;
  const recipe = getRecipe(meal) as any;
  const recipeId = getId(recipe);
  const hasSchedule = Boolean(meal);

  const [createSchedule] = useGraphMutation(CREATE_SCHEDULE, {
    onSuccess: refetch
  });
  const [updateSchedule] = useGraphMutation(UPDATE_SCHEDULE, {
    onSuccess: refetch
  });
  const [deleteSchedule] = useGraphMutation(DELETE_SCHEDULE, {
    onSuccess: refetch
  });

  function handleDelete() {
    deleteSchedule(createScheduleQuery({ id: meal.id }));
  }

  function handleLink() {
    router.push(`/recipe/edit/${recipeId}`);
  }

  async function handleSave(value: string) {
    const plan = await onSavePlan();

    if (!hasSchedule) {
      createSchedule(
        createScheduleQuery({
          day,
          meal: type,
          plan: plan.id,
          recipe: value,
          owner: user.id
        })
      );

      return;
    }

    updateSchedule(
      createScheduleQuery({
        id: meal.id,
        day,
        meal: type,
        plan: plan.id,
        recipe: value,
        owner: user.id
      })
    );
  }

  return (
    <RecipeTile
      recipe={recipe}
      onChange={handleSave}
      onDelete={handleDelete}
      onLink={handleLink}
    />
  );
};

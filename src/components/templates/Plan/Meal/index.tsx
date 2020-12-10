/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { orEmptyString } from '@project/services';
import { useGraphMutation } from '@project/hooks';
import {
  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE
} from '@project/graphql';
import { UserType } from '@project/types';
import { createScheduleQuery } from '@project/services';
import { useAuth } from '@project/context';
import { Input } from '@project/containers';
import {
  Button,
  ButtonType,
  Heading,
  HeadingTag,
  Image,
  InputType,
  Modal,
  Tile,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  getId,
  getInitialValues,
  getMeal,
  getMeals,
  getRecipe,
  schema
} from './model';
import { MealBody } from './styles';
import { RecipeSearch } from '../RecipeSearch';

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
  const [isActive, setIsActive] = useState(false);

  const meals = getMeals(day, schedule);
  const meal = getMeal(type, meals) as any;
  const recipe = getRecipe(meal) as any;
  const recipeId = getId(recipe) as string;
  const hasSchedule = Boolean(meal);

  const [createSchedule] = useGraphMutation(CREATE_SCHEDULE, {
    onSuccess: handleSuccess
  });
  const [updateSchedule] = useGraphMutation(UPDATE_SCHEDULE, {
    onSuccess: handleSuccess
  });
  const [deleteSchedule] = useGraphMutation(DELETE_SCHEDULE, {
    onSuccess: handleSuccess
  });

  async function handleSuccess() {
    await refetch();
    setIsActive(false);
  }

  function handleEdit() {
    setIsActive(true);
  }

  function handleLink() {
    router.push(`/recipes/${recipeId}`);
  }

  async function handlSubmit(value: { id: string; serving: number }) {
    const plan = await onSavePlan();
    const params = createScheduleQuery({
      id: meal?.id,
      day,
      meal: type,
      plan: plan.id,
      recipe: value.id,
      serving: value.serving,
      owner: user.id
    });

    if (!hasSchedule) {
      createSchedule(params);
    } else {
      updateSchedule(params);
    }
  }

  function handleDelete() {
    deleteSchedule(createScheduleQuery({ id: meal.id }));
  }

  return (
    <Fragment>
      <Tile
        id={recipeId}
        onClick={handleEdit}
        onDelete={handleDelete}
        onLink={handleLink}
      >
        <When condition={Boolean(recipe)}>
          <MealBody>
            <Heading tag={HeadingTag.H6}>
              {orEmptyString('title', recipe)}
            </Heading>
            <Image
              src={orEmptyString('image', recipe)}
              alt={orEmptyString('title', recipe)}
            />
          </MealBody>
        </When>
      </Tile>
      <Modal
        title="Choose a recipe"
        isActive={isActive}
        onClose={() => setIsActive(false)}
      >
        <Formik
          initialValues={getInitialValues(recipe)}
          onSubmit={handlSubmit}
          validationSchema={schema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Wrapper spacing={WrapperSpacing.SMALL}>
                <Input
                  disabled={isSubmitting}
                  label="Serving"
                  name="serving"
                  min={1}
                  type={InputType.NUMBER}
                />
              </Wrapper>
              <Wrapper spacing={WrapperSpacing.SMALL}>
                <RecipeSearch />
              </Wrapper>
              <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

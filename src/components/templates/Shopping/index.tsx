/** @format */

import React, { FunctionComponent, Fragment } from 'react';
import { Formik, Form } from 'formik';
import { useQueryCache } from 'react-query';
import { propOr, view } from 'ramda';
import {
  GET_PLAN_RECIPES,
  GET_SHOPPING,
  CREATE_SHOPPING,
  UPDATE_SHOPPING
} from '@project/graphql';
import { useAuth } from '@project/context';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import {
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Heading,
  MenuButton,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { MenuOptions } from './MenuOptions';
import { ShoppingTable } from './ShoppingTable';
import { createQuery, getShoppingId, mergeIngredients } from './model';

export interface ShoppingPageProps {
  week?: string;
}

const Shopping: FunctionComponent<ShoppingPageProps> = ({
  week
}: ShoppingPageProps) => {
  const { user } = useAuth();
  const queryCache = useQueryCache();

  const { data: recipes } = useGraphQuery(
    [`plan/recipes/${week}`, { week }],
    GET_PLAN_RECIPES
  );

  const { data: shopping } = useGraphQuery(
    [`shopping/${week}`, { week }],
    GET_SHOPPING
  );

  const [createShopping] = useGraphMutation(CREATE_SHOPPING, {
    onSuccess: () => queryCache.invalidateQueries(`shopping/${week}`)
  });

  const [updateShopping] = useGraphMutation(UPDATE_SHOPPING);

  const recordID = view(getShoppingId as any, shopping);
  const ingredients = mergeIngredients(shopping, recipes);
  const hasIngredients = Boolean(ingredients.length);

  async function handleSubmit(values: any, { setSubmitting }: any) {
    await createQuery(shopping)(values).cata(
      createShopping as any,
      updateShopping as any
    );

    setSubmitting(false);
  }

  return (
    <Fragment>
      <When condition={!hasIngredients}>
        <p>You need to build a plan</p>
      </When>
      <When condition={hasIngredients}>
        <Formik
          enableReinitialize
          initialValues={{
            id: recordID,
            ingredients,
            week,
            owner: propOr('', 'id', user)
          }}
          onSubmit={handleSubmit}
        >
          <Form id="shopping-form">
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
                <FlexColumn>
                  <Heading>Shopping List</Heading>
                </FlexColumn>
                <FlexColumn>
                  <MenuButton>
                    <MenuOptions />
                  </MenuButton>
                </FlexColumn>
              </Flex>
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.SMALL}>
              <ShoppingTable />
            </Wrapper>
          </Form>
        </Formik>
      </When>
    </Fragment>
  );
};

export default Shopping;

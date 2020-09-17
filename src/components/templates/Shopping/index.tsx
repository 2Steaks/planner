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
import { sendShoppingList } from '@project/services';
import { useAuth } from '@project/context';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import {
  Button,
  ButtonVariant,
  Drawer,
  DrawerPosition,
  Flex,
  FlexColumn,
  Heading,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
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

  function handleSubmit(values: any) {
    createQuery(shopping)(values).cata(
      createShopping as any,
      updateShopping as any
    );
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
          {({ dirty, values }) => (
            <Form>
              <Wrapper spacing={WrapperSpacing.LARGE}>
                <Heading>Shopping List</Heading>
              </Wrapper>
              <Wrapper spacing={WrapperSpacing.SMALL}>
                <ShoppingTable data={values.ingredients} />
              </Wrapper>
              <Drawer padding position={DrawerPosition.BOTTOM}>
                <Flex>
                  <FlexColumn>
                    <Button type={ButtonVariant.SUBMIT}>Save</Button>
                  </FlexColumn>
                  <When condition={dirty}>
                    <FlexColumn>
                      <Button type={ButtonVariant.RESET}>Reset</Button>
                    </FlexColumn>
                  </When>
                  <FlexColumn>
                    <Button
                      onClick={() =>
                        sendShoppingList(
                          propOr('', 'email', user),
                          values.ingredients
                        )
                      }
                    >
                      Share
                    </Button>
                  </FlexColumn>
                </Flex>
              </Drawer>
            </Form>
          )}
        </Formik>
      </When>
    </Fragment>
  );
};

export default Shopping;

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
import { BackButton } from '@project/containers';
import {
  AppBar,
  Button,
  ButtonVariant,
  ButtonType,
  EmailIcon,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  List,
  ListItem,
  Heading,
  MenuButton,
  MenuListButton,
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
    GET_PLAN_RECIPES,
    { staleTime: 0 }
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
          {({ dirty, isSubmitting, values }) => (
            <Form id="shopping-form">
              <AppBar isSticky>
                <Wrapper spacing={WrapperSpacing.MEDIUM}>
                  <Flex
                    alignItems={FlexAlignItems.BASELINE}
                    justifyContent={FlexJustifyContent.SPACE_BETWEEN}
                  >
                    <FlexColumn shrink={1}>
                      <BackButton />
                    </FlexColumn>
                    <FlexColumn grow={1}>
                      <Heading>Shopping List</Heading>
                    </FlexColumn>
                    <FlexColumn>
                      <MenuButton>
                        <List>
                          <ListItem dropMargin>
                            <MenuListButton
                              disabled={isSubmitting}
                              onClick={() =>
                                sendShoppingList(
                                  propOr('', 'email', user),
                                  propOr([], 'ingredients', values)
                                )
                              }
                              variant={ButtonVariant.NONE}
                            >
                              <EmailIcon size={1.2} /> <span>Send</span>
                            </MenuListButton>
                          </ListItem>
                        </List>
                      </MenuButton>
                    </FlexColumn>
                  </Flex>
                </Wrapper>
              </AppBar>

              <Wrapper spacing={WrapperSpacing.LARGE}>
                <ShoppingTable />
              </Wrapper>

              <Flex>
                <When condition={dirty}>
                  <FlexColumn>
                    <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
                      Save
                    </Button>
                  </FlexColumn>
                  <FlexColumn>
                    <Button disabled={isSubmitting} type={ButtonType.RESET}>
                      Reset
                    </Button>
                  </FlexColumn>
                </When>
              </Flex>
            </Form>
          )}
        </Formik>
      </When>
    </Fragment>
  );
};

export default Shopping;

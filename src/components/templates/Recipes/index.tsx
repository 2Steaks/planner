/** @format */

// pages/index.js
import React, { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  ButtonVariant,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Heading,
  List,
  ListItem,
  MenuButton,
  Tabs,
  Tab
} from '@project/components';
import { FavouriteRecipes } from './FavouriteRecipes';
import { MyRecipes } from './MyRecipes';

/**
 *
 *
 * @returns
 */
const RecipesPage: FunctionComponent = () => {
  const [view, setView] = useState(0);

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Head>
        <title>Recipes page</title>
      </Head>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <FlexColumn>
          <Heading>Recipes</Heading>
        </FlexColumn>
        <FlexColumn>
          <MenuButton>
            <List>
              <ListItem padding>
                <Link href="/recipes/create" passHref>
                  <Button variant={ButtonVariant.NONE}>Create Recipe</Button>
                </Link>
              </ListItem>
            </List>
          </MenuButton>
        </FlexColumn>
      </Flex>

      <Tabs onChange={setView} value={view}>
        <Tab index={0} label="My Recipes">
          <MyRecipes />
        </Tab>
        <Tab index={1} label="Favourite Recipes">
          <FavouriteRecipes />
        </Tab>
      </Tabs>
    </ErrorBoundary>
  );
};

export default RecipesPage;

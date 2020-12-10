/** @format */

// pages/index.js
import React, { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BackButton } from '@project/containers';
import {
  AppBar,
  ButtonVariant,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  List,
  ListItem,
  MenuButton,
  MenuListButton,
  Heading,
  PencilIcon,
  Tabs,
  Tab,
  Wrapper,
  WrapperSpacing
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

      <AppBar isSticky>
        <Wrapper spacing={WrapperSpacing.SMALL}>
          <Flex
            alignItems={FlexAlignItems.BASELINE}
            justifyContent={FlexJustifyContent.SPACE_BETWEEN}
          >
            <FlexColumn shrink={1}>
              <BackButton url="/" />
            </FlexColumn>
            <FlexColumn grow={1}>
              <Heading>Recipes</Heading>
            </FlexColumn>
            <FlexColumn>
              <MenuButton>
                <List>
                  <ListItem dropMargin>
                    <Link href={`/recipes/create`} passHref>
                      <MenuListButton variant={ButtonVariant.NONE}>
                        <PencilIcon size={1.2} /> <span>Create Recipe</span>
                      </MenuListButton>
                    </Link>
                  </ListItem>
                </List>
              </MenuButton>
            </FlexColumn>
          </Flex>
        </Wrapper>
      </AppBar>

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

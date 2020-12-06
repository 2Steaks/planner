/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { prop } from 'ramda';
import { Breakpoints, RecipeType } from '@project/types';
import { useAuth } from '@project/context';
import { getTotalCalories, hasHistory } from '@project/services';
import { BackButton, FavouriteRecipe } from '@project/containers';
import {
  Anchor,
  CutleryIcon,
  Button,
  ButtonVariant,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  GridColumn,
  Heading,
  HeadingTag,
  List,
  ListItem,
  ListVariant,
  MenuButton,
  PencilIcon,
  RecipeArticle,
  ShareIcon,
  Tag,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getRecipeTips, getRelatedRecipes } from './model';
import { ImageWrapper, RecipePhoto, TagAnchor } from './styles';

interface RecipeViewPageProps {
  isAuthor: boolean;
  onEdit: () => void;
  record: RecipeType;
}

/**
 *
 *
 * @returns
 */
const RecipeViewPage: FunctionComponent<RecipeViewPageProps> = ({
  isAuthor,
  onEdit,
  record
}: RecipeViewPageProps) => {
  const { isAuthenticated } = useAuth() as any;

  function shareRecipe() {
    navigator.share({
      title: `Planner: ${record.title}`,
      text: record.description,
      url: `${process.env.NEXT_PUBLIC_HOST_URI}/recipes/${record.id}`
    });
  }

  return (
    <Fragment>
      <Head>
        <title>{record.title}</title>
      </Head>
      <Wrapper
        centered
        constraint={Breakpoints.LARGE}
        spacing={WrapperSpacing.LARGE}
      >
        <Flex
          alignItems={FlexAlignItems.BASELINE}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <When condition={hasHistory()}>
            <FlexColumn shrink={1}>
              <BackButton />
            </FlexColumn>
          </When>
          <FlexColumn grow={1}>
            <Heading tag={HeadingTag.H1}>{record.title}</Heading>
          </FlexColumn>
          <FlexColumn>
            <When condition={isAuthor || Boolean(navigator.share)}>
              <MenuButton>
                <List>
                  <When condition={Boolean(navigator.share)}>
                    <ListItem padding>
                      <Button
                        onClick={shareRecipe}
                        variant={ButtonVariant.NONE}
                      >
                        <List inline>
                          <ListItem>
                            <ShareIcon />
                          </ListItem>
                          <ListItem>Share</ListItem>
                        </List>
                      </Button>
                    </ListItem>
                  </When>
                  <When condition={isAuthor}>
                    <ListItem padding>
                      <Button onClick={onEdit} variant={ButtonVariant.NONE}>
                        <List inline>
                          <ListItem>
                            <PencilIcon />
                          </ListItem>
                          <ListItem>Edit</ListItem>
                        </List>
                      </Button>
                    </ListItem>
                  </When>
                </List>
              </MenuButton>
            </When>
          </FlexColumn>
        </Flex>

        <Grid>
          <GridColumn xs={12} md={3}>
            <ImageWrapper>
              <RecipePhoto src={prop('image', record)} />
              <When condition={isAuthenticated && !isAuthor}>
                <FavouriteRecipe id={record.id as string} />
              </When>
            </ImageWrapper>
          </GridColumn>
          <GridColumn xs={12} md={9}>
            <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <p>
                <CutleryIcon /> Serves: {record.serving}
              </p>

              <p>{getTotalCalories(record)} calories per serving</p>

              <p>
                By{' '}
                <Link href={`/author/${record.author.id}/recipes`}>
                  <Anchor>
                    {record.author.firstName} {record.author.lastName}
                  </Anchor>
                </Link>
              </p>
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.SMALL}>
              <p>{record.description}</p>
            </Wrapper>

            <List inline>
              {record?.tags?.data.map((tag: any) => (
                <ListItem key={tag.name}>
                  <Tag>
                    <Link href={`/tag/${tag.name}`} passHref>
                      <TagAnchor>{tag.name}</TagAnchor>
                    </Link>
                  </Tag>
                </ListItem>
              ))}
            </List>
          </GridColumn>
        </Grid>
      </Wrapper>

      <Grid>
        <GridColumn xs={12} md={6}>
          <Wrapper spacing={WrapperSpacing.LARGE}>
            <Heading tag={HeadingTag.H2}>Ingredients</Heading>
            <List variant={ListVariant.UNDERLINE}>
              {record.ingredients?.map((ingredient) => (
                <ListItem key={ingredient.original}>
                  {ingredient.original}
                </ListItem>
              ))}
            </List>
          </Wrapper>
        </GridColumn>
        <GridColumn xs={12} md={6}>
          <Wrapper spacing={WrapperSpacing.LARGE}>
            <Heading tag={HeadingTag.H2}>Method</Heading>
            <List>
              {record.method?.map((method, index: number) => (
                <ListItem key={method.instruction}>
                  <Heading tag={HeadingTag.H5}>Step {index + 1}</Heading>
                  <p>{method.instruction}</p>
                </ListItem>
              ))}
            </List>
          </Wrapper>
        </GridColumn>
      </Grid>

      <Wrapper spacing={WrapperSpacing.SMALL}>
        <When condition={Boolean(getRecipeTips(record).length)}>
          <Heading tag={HeadingTag.H2}>Recipe Tips</Heading>
        </When>

        <List>
          {getRecipeTips(record).map((tip: any) => (
            <ListItem key={tip.text}>{tip.text}</ListItem>
          ))}
        </List>
      </Wrapper>

      <Wrapper spacing={WrapperSpacing.SMALL}>
        <When condition={Boolean(getRelatedRecipes(record).length)}>
          <Heading tag={HeadingTag.H2}>Related Recipes</Heading>
        </When>

        <Grid>
          {getRelatedRecipes(record).map((relationship: any) => (
            <GridColumn key={relationship.id} xs={6} md={3} tag="article">
              <RecipeArticle {...relationship} />
            </GridColumn>
          ))}
        </Grid>
      </Wrapper>
    </Fragment>
  );
};

export default RecipeViewPage;

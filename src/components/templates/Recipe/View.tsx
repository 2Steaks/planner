/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { prop } from 'ramda';
import { Breakpoints, RecipeType } from '@project/types';
import { colors } from '@project/theme';
import { useAuth } from '@project/context';
import { getTotalCalories } from '@project/services';
import { BackButton, FavouriteRecipe } from '@project/containers';
import {
  Anchor,
  AppBar,
  Circle,
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
  MenuButton,
  MenuListButton,
  PencilIcon,
  RecipeArticleWithLink,
  ScalesIcon,
  ServingIcon,
  ShareIcon,
  Tag,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getRecipeTips, getRelatedRecipes } from './model';
import {
  ImageWrapper,
  InfoParagraph,
  InfoWrapper,
  IngredientList,
  RecipePhoto,
  TagAnchor
} from './styles';

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
        <AppBar isSticky={isAuthenticated}>
          <Flex
            alignItems={FlexAlignItems.BASELINE}
            justifyContent={FlexJustifyContent.SPACE_BETWEEN}
          >
            <FlexColumn shrink={1}>
              <BackButton url={document.referrer} />
            </FlexColumn>
            <FlexColumn grow={1}>
              <Heading tag={HeadingTag.H1}>{record.title}</Heading>
            </FlexColumn>
            <FlexColumn>
              <When condition={isAuthor || Boolean(navigator.share)}>
                <MenuButton>
                  <List>
                    <When condition={Boolean(navigator.share)}>
                      <ListItem dropMargin>
                        <MenuListButton
                          onClick={shareRecipe}
                          variant={ButtonVariant.NONE}
                        >
                          <ShareIcon size={1.2} /> <span>Share</span>
                        </MenuListButton>
                      </ListItem>
                    </When>
                    <When condition={isAuthor}>
                      <ListItem dropMargin>
                        <MenuListButton
                          onClick={onEdit}
                          variant={ButtonVariant.NONE}
                        >
                          <PencilIcon size={1.2} /> <span>Edit</span>
                        </MenuListButton>
                      </ListItem>
                    </When>
                  </List>
                </MenuButton>
              </When>
            </FlexColumn>
          </Flex>
        </AppBar>

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
            <InfoWrapper spacing={WrapperSpacing.MEDIUM}>
              <InfoParagraph>
                <Circle color={colors.blue}>
                  <ServingIcon size={1.5} />
                </Circle>{' '}
                <span>Serves: {record.serving}</span>
              </InfoParagraph>

              <InfoParagraph>
                <Circle color={colors.blue}>
                  <ScalesIcon size={1.5} />
                </Circle>{' '}
                <span>{getTotalCalories(record)} calories per serving</span>
              </InfoParagraph>

              <InfoParagraph>
                Added by{' '}
                <Link href={`/author/${record.author.id}/recipes`}>
                  <Anchor>
                    {record.author.firstName} {record.author.lastName}
                  </Anchor>
                </Link>
              </InfoParagraph>
            </InfoWrapper>

            <Wrapper spacing={WrapperSpacing.SMALL}>
              <p>{record.description}</p>
            </Wrapper>

            <List inline>
              {record?.tags?.data.map((tag: any) => (
                <ListItem key={tag.name}>
                  <Tag>
                    <Link href={`/recipes/tag/${tag.name}`} passHref>
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
          <Wrapper spacing={WrapperSpacing.LARGE} tag="section">
            <Heading tag={HeadingTag.H2}>Ingredients</Heading>
            <IngredientList>
              {record.ingredients?.map((ingredient) => (
                <ListItem key={ingredient.original} underline>
                  {ingredient.original}
                </ListItem>
              ))}
            </IngredientList>
          </Wrapper>
        </GridColumn>
        <GridColumn xs={12} md={6}>
          <Wrapper spacing={WrapperSpacing.LARGE} tag="section">
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

      <When condition={Boolean(getRecipeTips(record).length)}>
        <Wrapper spacing={WrapperSpacing.SMALL}>
          <Heading tag={HeadingTag.H2}>Recipe Tips</Heading>
          <List>
            {getRecipeTips(record).map((tip: any) => (
              <ListItem key={tip.text}>{tip.text}</ListItem>
            ))}
          </List>
        </Wrapper>
      </When>

      <When condition={Boolean(getRelatedRecipes(record).length)}>
        <Wrapper spacing={WrapperSpacing.SMALL}>
          <Heading tag={HeadingTag.H2}>Related Recipes</Heading>
          <Grid>
            {getRelatedRecipes(record).map((relationship: any) => (
              <GridColumn key={relationship.id} xs={6} md={3} tag="article">
                <RecipeArticleWithLink {...relationship} />
              </GridColumn>
            ))}
          </Grid>
        </Wrapper>
      </When>
    </Fragment>
  );
};

export default RecipeViewPage;

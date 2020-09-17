/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryCache } from 'react-query';
import { Formik, Form } from 'formik';
import { equals } from 'ramda';
import { Breakpoints, UserType } from '@project/types';
import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  GET_RECIPE,
  UPDATE_RECIPE
} from '@project/graphql';
import {
  createRecipeQuery,
  getTotalCalories,
  uploadImage,
  whenTrue
} from '@project/services';
import { useAuth } from '@project/context';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import {
  IngredientInput,
  Input,
  RecipeSelect,
  Repeater,
  Textarea
  // TagPicker
} from '@project/containers';
import {
  AvatarUploader,
  Button,
  ButtonTheme,
  ButtonVariant,
  Drawer,
  DrawerPosition,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  Grid,
  GridColumn,
  Heading,
  HeadingSize,
  HeadingTag,
  InputVariant,
  RecipeArticle,
  RepeaterRowProps,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  getAuthorId,
  getCreateRecipeId,
  getId,
  getImage,
  getInitialValues,
  getRecord,
  getRelatedRecipes,
  schema
} from './model';

interface RecipePageProps {
  id?: string;
}

/**
 *
 *
 * @returns
 */
const RecipePage: FunctionComponent<RecipePageProps> = ({
  id
}: RecipePageProps) => {
  const { user } = useAuth() as { user: UserType };
  const router = useRouter();
  const hasRecord = Boolean(id);

  const [isEditing, setIsEditing] = useState(!hasRecord);

  const queryCache = useQueryCache();

  const [createRecipe] = useGraphMutation(CREATE_RECIPE, {
    onSuccess: handleCreateComplete
  });

  const [updateRecipe] = useGraphMutation(UPDATE_RECIPE, {
    onSuccess: handleUpdateComplete
  });

  const [deleteRecipe] = useGraphMutation(DELETE_RECIPE, {
    onSuccess: handleDeleteComplete
  });

  const { data, error, isLoading } = useGraphQuery(
    [`recipe/${id}`, createRecipeQuery({ id, author: getId(user) })],
    GET_RECIPE,
    { enabled: hasRecord }
  );

  const record = getRecord(data) as any;
  const isAuthor = equals(getId(user), getAuthorId(record));

  /**
   * @todo fp
   * @todo start UI loading
   */
  function handleSubmit(values: any) {
    if (!hasRecord) {
      createRecipe(createRecipeQuery({ ...values, author: getId(user) }));
    } else {
      updateRecipe(createRecipeQuery({ ...values, author: getId(user) }));
    }
  }

  async function handleImageUpload(formData: any) {
    const image = await uploadImage(formData);

    updateRecipe(createRecipeQuery({ ...record, image, author: getId(user) }));
  }

  function handleCancel({ resetForm }: any) {
    return function () {
      if (hasRecord) {
        resetForm({ values: record });
        setIsEditing(false);
        return;
      }

      router.back();
    };
  }

  function handleDelete() {
    deleteRecipe(createRecipeQuery({ id, author: getId(user) }));
  }

  function handleCreateComplete(values: any) {
    router.push(`/recipe/edit/${getCreateRecipeId(values)}`);
  }

  function handleUpdateComplete() {
    setIsEditing(false);
    queryCache.invalidateQueries(`recipe/${id}`);
  }

  function handleDeleteComplete() {
    router.push('/');
  }

  if (hasRecord && isLoading) return <p>Loading...</p>;
  if (hasRecord && error) return <p>Error :(</p>;

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Head>
        <title>{record.title}</title>
      </Head>

      <Formik
        enableReinitialize
        initialValues={getInitialValues(record)}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ dirty, isSubmitting, setFieldValue, values, ...formProps }) => (
          <Form>
            <Wrapper
              centered
              padding
              constraint={Breakpoints.LARGE}
              spacing={WrapperSpacing.LARGE}
            >
              <Grid>
                <GridColumn xs={12} md={3}>
                  <AvatarUploader
                    label="Upload an image"
                    name="image"
                    disabled={!hasRecord || !isEditing || isSubmitting}
                    onChange={handleImageUpload}
                    value={getImage(values as any)}
                  />
                </GridColumn>
                <GridColumn xs={12} md={9}>
                  <When condition={!isEditing}>
                    <Heading size={HeadingSize.SUPER} tag={HeadingTag.H1}>
                      {values.title}
                    </Heading>
                  </When>
                  <When condition={isEditing}>
                    <Input
                      disabled={isSubmitting}
                      name="title"
                      label={whenTrue(isEditing, 'Title')}
                      readOnly={!isEditing}
                    />
                  </When>
                  {/* <Wrapper spacing={WrapperSpacing.SMALL}>
                      <TagPicker
                        label="Tags"
                        name="tags.data"
                        isDisabled={!hasRecord || !isEditing}
                        recordId={id as string}
                        onChange={refetch}
                      />
                    </Wrapper> */}
                  <Wrapper spacing={WrapperSpacing.SMALL}>
                    <When condition={!isEditing}>
                      <p>Serves: {values.serving}</p>
                    </When>
                    <When condition={isEditing}>
                      <Input
                        disabled={isSubmitting}
                        label="Serving"
                        name="serving"
                        min={1}
                        readOnly={!isEditing}
                        type={InputVariant.NUMBER}
                      />
                    </When>
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.SMALL}>
                    <Textarea
                      disabled={isSubmitting}
                      label={whenTrue(isEditing, 'Description')}
                      name="description"
                      readOnly={!isEditing}
                      rows={1}
                    />
                  </Wrapper>

                  <p>{getTotalCalories(values)} calories per serving</p>
                </GridColumn>
              </Grid>
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Grid>
                <GridColumn xs={12} md={6}>
                  <Heading tag={HeadingTag.H2}>Ingredients</Heading>
                  <Repeater
                    isDisabled={!isEditing || isSubmitting}
                    name="ingredients"
                    label="Add ingredients"
                  >
                    {({ index }: RepeaterRowProps) => (
                      <IngredientInput
                        disabled={isSubmitting}
                        readOnly={!isEditing}
                        name={`ingredients.${index}`}
                      />
                    )}
                  </Repeater>
                </GridColumn>
                <GridColumn xs={12} md={6}>
                  <Heading tag={HeadingTag.H2}>Method</Heading>
                  <Repeater
                    isDisabled={!isEditing || isSubmitting}
                    name="method"
                    label="Add method"
                  >
                    {({ index }: RepeaterRowProps) => (
                      <Fragment>
                        <Heading tag={HeadingTag.H6}>Step {index + 1}</Heading>
                        <Textarea
                          disabled={isSubmitting}
                          readOnly={!isEditing}
                          name={`method.${index}.instruction`}
                          rows={1}
                        />
                      </Fragment>
                    )}
                  </Repeater>
                </GridColumn>
              </Grid>
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.SMALL}>
              <When
                condition={
                  Boolean(getRelatedRecipes(values).length) || isEditing
                }
              >
                <Heading tag={HeadingTag.H2}>Related Recipes</Heading>
              </When>

              <When condition={isEditing}>
                <Repeater isDisabled={isSubmitting} name="recipes">
                  {(props: RepeaterRowProps) => <RecipeSelect {...props} />}
                </Repeater>
              </When>

              <When condition={!isEditing}>
                <Grid>
                  {getRelatedRecipes(record).map((relationship) => (
                    <GridColumn key={id} xs={12} sm={6} md={3} tag="article">
                      <RecipeArticle {...relationship} />
                    </GridColumn>
                  ))}
                </Grid>
              </When>
            </Wrapper>

            <When condition={Boolean(!hasRecord || isAuthor)}>
              <Drawer padding position={DrawerPosition.BOTTOM}>
                <Flex>
                  <When condition={hasRecord && !isEditing}>
                    <FlexColumn>
                      <Button
                        disabled={isSubmitting}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    </FlexColumn>
                  </When>
                  <When condition={isEditing && dirty}>
                    <FlexColumn>
                      <Button
                        disabled={isSubmitting}
                        type={ButtonVariant.SUBMIT}
                      >
                        Save
                      </Button>
                    </FlexColumn>
                  </When>
                  <When condition={isEditing}>
                    <FlexColumn>
                      <Button
                        disabled={isSubmitting}
                        onClick={handleCancel(formProps)}
                      >
                        Cancel
                      </Button>
                    </FlexColumn>
                  </When>
                  <When condition={hasRecord && isEditing}>
                    <FlexColumn>
                      <Button
                        disabled={isSubmitting}
                        theme={ButtonTheme.WARNING}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </FlexColumn>
                  </When>
                </Flex>
              </Drawer>
            </When>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

export default RecipePage;

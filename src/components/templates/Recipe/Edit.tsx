/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryCache } from 'react-query';
import { Formik, Form } from 'formik';
import { Breakpoints, RecipeType, UserType } from '@project/types';
import { CREATE_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from '@project/graphql';
import {
  createRecipeQuery,
  getTotalCalories,
  uploadImage
} from '@project/services';
import { useAuth } from '@project/context';
import { useGraphMutation } from '@project/hooks';
import {
  IngredientInput,
  Input,
  RecipeSelectWithField,
  Repeater,
  Textarea,
  TagPicker
} from '@project/containers';
import {
  Button,
  ButtonType,
  ButtonVariant,
  Flex,
  FlexColumn,
  Grid,
  GridColumn,
  Heading,
  HeadingTag,
  InputType,
  Modal,
  RepeaterRowProps,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  getCreateRecipeId,
  getId,
  getImage,
  getInitialValues,
  hasBeenScheduled,
  schema
} from './model';
import { ImageWrapper, RecipePhotoUploader } from './styles';

interface RecipeEditPageProps {
  hasRecord: boolean;
  onCancel: () => void;
  onComplete: () => void;
  refetch: () => void;
  record: RecipeType;
}

/**
 *
 *
 * @returns
 */
const RecipeEditPage: FunctionComponent<RecipeEditPageProps> = ({
  hasRecord,
  onCancel,
  onComplete,
  refetch,
  record
}: RecipeEditPageProps) => {
  const router = useRouter();
  const { user } = useAuth() as { user: UserType };
  const queryCache = useQueryCache();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const [createRecipe] = useGraphMutation(CREATE_RECIPE, {
    onSuccess: handleCreateComplete
  });

  const [updateRecipe] = useGraphMutation(UPDATE_RECIPE, {
    onSuccess: handleUpdateComplete
  });

  const [deleteRecipe] = useGraphMutation(DELETE_RECIPE, {
    onSuccess: handleDeleteComplete
  });

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
        onCancel();
        return;
      }

      router.back();
    };
  }

  function handleDelete() {
    setIsDeleteModalActive(true);
  }

  function handleDeleteConfirm() {
    deleteRecipe(createRecipeQuery({ id: record.id, author: getId(user) }));
  }

  function handleCreateComplete(values: any) {
    router.push(`/recipes/${getCreateRecipeId(values)}`);
  }

  function handleUpdateComplete() {
    onComplete();
    queryCache.invalidateQueries(`recipe/${record.id}`);
  }

  function handleDeleteComplete() {
    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Editing {record.title}</title>
      </Head>
      <Formik
        enableReinitialize
        initialValues={getInitialValues(record)}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ dirty, isSubmitting, setFieldValue, values, ...formProps }) => (
          <Form id="recipe-form">
            <Wrapper
              centered
              constraint={Breakpoints.LARGE}
              spacing={WrapperSpacing.LARGE}
            >
              <Wrapper spacing={WrapperSpacing.SMALL}>
                <Heading tag={HeadingTag.H1}>
                  {!hasRecord ? 'Create Recipe' : 'Edit Recipe'}
                </Heading>
              </Wrapper>

              <Grid>
                <GridColumn xs={12} md={3}>
                  <ImageWrapper>
                    <RecipePhotoUploader
                      label="Upload an image"
                      name="image"
                      disabled={!hasRecord || isSubmitting}
                      onChange={handleImageUpload}
                      value={getImage(values as any)}
                    />
                  </ImageWrapper>
                </GridColumn>
                <GridColumn xs={12} md={9}>
                  <Wrapper spacing={WrapperSpacing.SMALL}>
                    <Input disabled={isSubmitting} name="title" label="Title" />
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.SMALL}>
                    <TagPicker
                      label="Tags"
                      name="tags.data"
                      disabled={!hasRecord || isSubmitting}
                      recordId={values.id as string}
                      onChange={refetch}
                    />
                  </Wrapper>
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
                    <Textarea
                      disabled={isSubmitting}
                      label="Description"
                      name="description"
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
                    isDisabled={isSubmitting}
                    name="ingredients"
                    label="Add ingredients"
                  >
                    {({ index }: RepeaterRowProps) => (
                      <IngredientInput
                        disabled={isSubmitting}
                        name={`ingredients.${index}`}
                      />
                    )}
                  </Repeater>
                </GridColumn>
                <GridColumn xs={12} md={6}>
                  <Heading tag={HeadingTag.H2}>Method</Heading>

                  <Repeater
                    isDisabled={isSubmitting}
                    name="method"
                    label="Add method"
                  >
                    {({ index }: RepeaterRowProps) => (
                      <Fragment>
                        <Heading tag={HeadingTag.H6}>Step {index + 1}</Heading>
                        <Textarea
                          disabled={isSubmitting}
                          name={`method.${index}.instruction`}
                          rows={1}
                        />
                      </Fragment>
                    )}
                  </Repeater>
                </GridColumn>
              </Grid>
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Heading tag={HeadingTag.H2}>Related Recipes</Heading>

              <Repeater isDisabled={isSubmitting} name="recipes">
                {({ index }: RepeaterRowProps) => (
                  <RecipeSelectWithField name={`recipes.${index}`} />
                )}
              </Repeater>
            </Wrapper>

            <hr />

            <Flex>
              <When condition={dirty}>
                <FlexColumn>
                  <Button
                    disabled={isSubmitting}
                    type={ButtonType.SUBMIT}
                    form="recipe-form"
                  >
                    Save
                  </Button>
                </FlexColumn>
              </When>
              <FlexColumn padding>
                <Button
                  disabled={isSubmitting}
                  onClick={handleCancel(formProps)}
                >
                  Cancel
                </Button>
              </FlexColumn>
              <When condition={hasRecord}>
                <FlexColumn padding>
                  <Button
                    disabled={isSubmitting}
                    onClick={handleDelete}
                    variant={ButtonVariant.WARNING}
                  >
                    Delete
                  </Button>
                </FlexColumn>
              </When>
            </Flex>
          </Form>
        )}
      </Formik>
      <Modal
        title="Delete recipe"
        isActive={isDeleteModalActive}
        onClose={() => setIsDeleteModalActive(false)}
      >
        <Wrapper padding>
          <When condition={hasBeenScheduled(record)}>
            <p>
              Your recipe is now in active use, you may edit the recipe, but you
              can no longer delete it.
            </p>
          </When>
          <When condition={!hasBeenScheduled(record)}>
            <p>Are you sure you want to delete this recipe?</p>
            <Button onClick={handleDeleteConfirm}>Yes</Button>
          </When>
        </Wrapper>
      </Modal>
    </Fragment>
  );
};

export default RecipeEditPage;

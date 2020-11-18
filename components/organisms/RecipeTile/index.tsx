/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { Formik, Form } from 'formik';
import { prop } from 'ramda';
import { orEmptyString } from '@project/services';
import {
  Button,
  ButtonVariant,
  Heading,
  HeadingTag,
  Image,
  Modal,
  Tile,
  When
} from '@project/components';
import { RecipeSelectWithField } from '@project/containers';
import { getInitialValues, schema } from './model';
import { MealBody } from './styles';

export interface RecipeFinderProps {
  disabled?: boolean;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
  onLink?: (id: string) => void;
  recipe: any;
}

export const RecipeTile: FunctionComponent<RecipeFinderProps> = ({
  onChange,
  recipe,
  ...props
}: RecipeFinderProps) => {
  const [isActive, setIsActive] = useState(false);

  function handlSubmit(values: { id: string }) {
    onChange(prop('id', values) as any);
    setIsActive(false);
  }

  function handleEdit() {
    setIsActive(true);
  }

  return (
    <Fragment>
      <Tile id={prop('id', recipe)} onAdd={handleEdit} {...props}>
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
              <RecipeSelectWithField
                label="Choose a recipe"
                name="id"
                disabled={isSubmitting}
              />
              <Button disabled={isSubmitting} type={ButtonVariant.SUBMIT}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

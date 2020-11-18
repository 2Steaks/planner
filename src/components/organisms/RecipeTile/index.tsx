/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { Formik, Form } from 'formik';
import { prop } from 'ramda';
import { orEmptyString } from '@project/services';
import {
  Button,
  ButtonType,
  Heading,
  HeadingTag,
  Image,
  InputType,
  Modal,
  Tile,
  When
} from '@project/components';
import { Input, RecipeSelectWithField } from '@project/containers';
import { getInitialValues, schema } from './model';
import { MealBody } from './styles';
import { Wrapper, WrapperSpacing } from '@project/components/atoms';

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

  function handlSubmit(values: { id: string; serving: number }) {
    onChange(values as any);
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
              <Wrapper spacing={WrapperSpacing.SMALL}>
                <RecipeSelectWithField name="id" disabled={isSubmitting} />
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
              <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

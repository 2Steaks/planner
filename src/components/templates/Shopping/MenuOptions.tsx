/** @format */

/** @format */

import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { propOr } from 'ramda';
import { sendShoppingList } from '@project/services';
import { useAuth } from '@project/context';
import {
  Button,
  ButtonVariant,
  ButtonType,
  List,
  ListItem,
  MobileMenuButtonContext,
  When,
  useMobileMenuButton
} from '@project/components';

export const MenuOptions: FunctionComponent = () => {
  const { user } = useAuth();
  const { dirty, isSubmitting, submitForm, values } = useFormikContext();
  const { onClose } = useMobileMenuButton() as MobileMenuButtonContext;

  function handleSubmit() {
    submitForm();
    onClose();
  }

  return (
    <List>
      <ListItem padding>
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit}
          variant={ButtonVariant.NONE}
          form="shopping-form"
        >
          Save
        </Button>
      </ListItem>
      <When condition={dirty}>
        <ListItem padding>
          <Button
            disabled={isSubmitting}
            type={ButtonType.RESET}
            variant={ButtonVariant.NONE}
          >
            Reset
          </Button>
        </ListItem>
      </When>
      <ListItem padding>
        <Button
          disabled={isSubmitting}
          onClick={() =>
            sendShoppingList(
              propOr('', 'email', user),
              propOr([], 'ingredients', values)
            )
          }
          variant={ButtonVariant.NONE}
        >
          Share
        </Button>
      </ListItem>
    </List>
  );
};

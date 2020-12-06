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
  CrossIcon,
  EmailIcon,
  List,
  ListItem,
  MobileMenuButtonContext,
  TickIcon,
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
          <List inline>
            <ListItem>
              <TickIcon />
            </ListItem>
            <ListItem>Save</ListItem>
          </List>
        </Button>
      </ListItem>
      <When condition={dirty}>
        <ListItem padding>
          <Button
            disabled={isSubmitting}
            type={ButtonType.RESET}
            variant={ButtonVariant.NONE}
          >
            <List inline>
              <ListItem>
                <CrossIcon />
              </ListItem>
              <ListItem>Reset</ListItem>
            </List>
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
          <List inline>
            <ListItem>
              <EmailIcon />
            </ListItem>
            <ListItem>Send</ListItem>
          </List>
        </Button>
      </ListItem>
    </List>
  );
};

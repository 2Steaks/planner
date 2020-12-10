/** @format */

import React, { FunctionComponent, useEffect, useState } from 'react';
import { compose, equals } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { Button } from '@project/components/atoms/Button';
import { BellIcon } from '@project/components/atoms/Icon/Bell';
import { When } from '@project/components/atoms/When';
import { isAwaitingPermission } from './model';
import { styles } from './styles';

const Component: FunctionComponent = (props) => {
  const [hasPermission, setHasPermission] = useState(false);

  function handlePushNotificationChange() {
    if (!hasPermission) {
      Notification.requestPermission().then((permission) => {
        if (equals('granted', permission)) {
          new Notification('Meal Planner', {
            body: 'You will recieve daily meal reminders',
            icon: '/icons/icon-512x512.png',
            badge: '/icons/icon-512x512.png'
          });
        }

        setHasPermission(true);
      });
    }
  }

  useEffect(() => {
    navigator.permissions
      .query({ name: 'notifications' })
      .then(compose(setHasPermission, isAwaitingPermission));
  }, []);

  return (
    <div {...props}>
      <Button disabled={hasPermission} onClick={handlePushNotificationChange}>
        <BellIcon />
      </Button>
      <When condition={hasPermission}>
        <i>Check browser settings to change notification settings</i>
      </When>
    </div>
  );
};

export const PushNotificationButton = compose(
  withStyle(styles),
  withDisplayName('PushNotificationButton')
)(Component);

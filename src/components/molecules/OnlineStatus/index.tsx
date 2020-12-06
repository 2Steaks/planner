/** @format */

import React, { FunctionComponent, useEffect, useState } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { List, ListItem } from '@project/components/molecules/List';
import { NoWifiIcon } from '@project/components/atoms/Icon/NoWifi';
import { When } from '@project/components/atoms/When';
import { styles } from './styles';

export interface OnlineStatusProps {
  className: string;
}

const Component: FunctionComponent<OnlineStatusProps> = ({
  className
}: OnlineStatusProps) => {
  const [isOnline, setIsOnline] = useState(true);

  function handleOnlineState() {
    setIsOnline(true);
  }

  function handleOfflineState() {
    setIsOnline(false);
  }

  useEffect(() => {
    window.addEventListener('online', handleOnlineState);
    window.addEventListener('offline', handleOfflineState);

    return () => {
      window.addEventListener('online', handleOnlineState);
      window.removeEventListener('offline', handleOfflineState);
    };
  }, []);

  return (
    <When condition={!isOnline}>
      <div className={className}>
        <List inline>
          <ListItem>
            <NoWifiIcon />
          </ListItem>
          <ListItem>You are offline</ListItem>
        </List>
      </div>
    </When>
  );
};

export const OnlineStatus = compose(
  withStyle(styles),
  withDisplayName('OnlineStatus')
)(Component);

/** @format */

import React, { Fragment, ReactNode } from 'react';
import { Global } from '@emotion/core';
import { globalStyles } from '@project/theme';

export const StoryWrapper = (storyFn: () => ReactNode) => {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      {storyFn()}
    </Fragment>
  );
};

/** @format */

import React, { FunctionComponent } from 'react';
import ContentLoader from 'react-content-loader';

export const ArticleSkeleton: FunctionComponent = (props) => (
  <ContentLoader viewBox="0 0 280 320" height={320} width="100%" {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="150" />
    <rect x="0" y="165" rx="0" ry="0" width="70%" height="20" />
    <rect x="0" y="200" rx="0" ry="0" width="85%" height="10" />
    <rect x="0" y="215" rx="0" ry="0" width="80%" height="10" />
    <rect x="0" y="230" rx="0" ry="0" width="83%" height="10" />
    <rect x="0" y="245" rx="0" ry="0" width="80%" height="10" />
    <rect x="0" y="260" rx="0" ry="0" width="84%" height="10" />
  </ContentLoader>
);

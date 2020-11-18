/** @format */

import * as R from 'ramda';

export const hiphenToSlash = R.replace(/-/g, '/');

export const orEmptyString = (x: string, props: any): string =>
  R.propOr('', x, props);

export const slashToHiphen = R.replace(/\//g, '-');

export const truncate = (limit: number) =>
  R.when(
    R.propSatisfies(R.gt(R.__, limit), 'length'),
    R.pipe(R.take(limit), R.append('…'), R.join(''))
  );

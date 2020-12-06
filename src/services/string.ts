/** @format */

import * as R from 'ramda';

export const capitalize = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail])
) as any;

export const hiphenToSlash = R.replace(/-/g, '/');

export const orEmptyString = (x: string, props: any): string =>
  R.propOr('', x, props);

export const slashToHiphen = R.replace(/\//g, '-');

export const truncate = (limit: number) =>
  R.when(
    R.propSatisfies(R.gt(R.__, limit), 'length'),
    R.pipe(R.take(limit), R.append('…'), R.join(''))
  );

type isRouteType = (path: string) => (route: string) => boolean;
const regex = (path: string) => new RegExp('^\\' + path + '(?=/|$)');
export const isRoute: isRouteType = (path: string) => R.test(regex(path));

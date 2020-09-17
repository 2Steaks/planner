/** @format */

import * as R from 'ramda';
import { option, safe } from './monadic';
import { safeIntersection } from './logic';

// hasIntersection :: (Array) -> Array -> Monad -> (Monad -> Boolean) -> Array
export const hasIntersection = (arr: any[]) =>
  R.compose(option(false), R.map(hasValue), safeIntersection(arr));

// inArray :: Array -> Identity -> Boolean
type inArrayType = (xs: string[] | number[]) => (x: string | number) => boolean;
export const inArray: inArrayType = R.curry((xs, x) => xs.includes(x));

// isArray :: Identity -> Boolean
export const isArray = Array.isArray;

// safeArray ::
export const safeArray = safe(isArray);

// isDefined :: Identity -> Boolean
export const isDefined = (x: any): boolean => typeof x !== 'undefined';

// isFunction :: Identity -> Boolean
export const isFunction = (x: any): boolean => typeof x === 'function';

// isNull :: Identity -> Boolean
export const isNull = (x: any): boolean => x === null;

// isNumber :: Identity -> Boolean
export const isNumber = (x: number): boolean =>
  typeof x === 'number' && !isNaN(x);

// isObject :: Identity -> Boolean
export const isObject = (x: any): boolean =>
  typeof x === 'object' && !Array.isArray(x);

// isString :: Identity -> Boolean
export const isString = (x: string): boolean => typeof x === 'function';

// hasValue :: Identity -> Boolean
export const hasValue = R.both(isDefined, R.complement(R.isEmpty));

export const StringIsNumber = (value: string | number) =>
  isNaN(Number(value)) === false;

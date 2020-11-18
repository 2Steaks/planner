/** @format */

import * as R from 'ramda';
import { Either, Maybe } from 'monet';
import { IMaybe } from '@project/types/Algebraic';
import { isFunction } from './predicates';

// option :: a -> Monad -> b
export const option = R.curry((x: any, Maybe: IMaybe<any>) => {
  if (!(Maybe && isFunction(Maybe.orSome))) {
    throw new TypeError('option: Last argument must be a Maybe, First or Last');
  }

  return Maybe.orSome(x);
});

// safe ::
export const safe = R.curry((pred: (x: any) => boolean, x: any) =>
  pred(x) ? Maybe.Just(x) : Maybe.Nothing()
);

// safeAfter ::
export const safeAfter = R.curry(
  (pred: (x: any) => boolean, fn: (x: any) => IMaybe<any>) =>
    R.compose(safe(pred), fn)
);

// safe ::
export const either = (pred: (x: any) => boolean) =>
  R.ifElse(pred, Either.Right, Either.Left);

// safeAfter ::
export const eitherAfter = R.curry(
  (pred: (x: any) => boolean, fn: (x: any) => IMaybe<any>) =>
    R.compose(either(pred), fn)
);

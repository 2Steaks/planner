/** @format */

import { SerializedStyles } from '@emotion/core';
import * as R from 'ramda';

const dotPath = R.useWith(R.path, [R.split('.')]);

const flip = R.curryN(1, function flip(fn) {
  return R.curryN(fn.length, function (...props) {
    const args = Array.prototype.slice.call(props, 0);
    args.push(args.shift());

    return fn.apply(this as any, args);
  });
});

const media = (rule: string) => `@media ${rule}`;

const get = R.curry((key, props) => dotPath(key, props));

const has = R.curry(
  (key, style, props) => Boolean(dotPath(key, props)) && style
);

const ifElse = R.curry((key, value, a, b, props) =>
  dotPath(key, props) === value ? a : b
);

const cond = R.curry(
  (key, obj, props) => obj[dotPath(key, props)] || obj.default
);

const not = R.curry((key, style, props) => !dotPath(key, props) && style);

const when = R.curry(
  (key, value, style, props) => dotPath(key, props) === value && style
);

const unless = R.curry(
  (key, value, style, props) => dotPath(key, props) !== value && style
);

const trace = (props: any) => (name = 'Component') => {
  console.log(`${name} style props: `, props);
  return null;
};

/**
 * Can be used with: has, not, when, unless
 *
 * Example:
 *
 * ${nest(when('fruit', 'banana'))} {
 *    color: yellow;
 * }
 */
const nest = R.curry((props, fn) =>
  fn(true, props) ? media('all') : media('not all')
);

export const styleWithHelpers = (
  fn: (obj: any, props: any) => SerializedStyles
) => (props: any) => {
  return fn(
    {
      cond: flip(cond)(props),
      get: flip(get)(props),
      has: flip(has)(props),
      ifElse: flip(ifElse)(props),
      nest: nest(props),
      not: flip(not)(props),
      trace: trace(props),
      when: flip(when)(props),
      unless: flip(unless)(props)
    },
    props
  );
};

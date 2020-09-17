/** @format */
import { ChangeEvent } from 'react';
import * as R from 'ramda';
import { safeAfter } from './monadic';
import { isDefined, StringIsNumber } from './predicates';

export const dotPath = R.useWith(R.path, [R.split('.')]);

export const dotPathEq = R.useWith(R.pathEq, [R.split('.')]);

export const getRouteId = R.path(['query', 'id']);

export const getTargetValue = R.path(['target', 'value']) as (
  event: ChangeEvent<HTMLTextAreaElement>
) => string;

export const renameKey = R.curry((oldKey, newKey, obj) =>
  R.assoc(newKey, R.prop(oldKey, obj), R.dissoc(oldKey, obj))
);

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

export const safeProp = (x: any) => safeAfter(isDefined, R.prop(x));

export const enumToObject = R.filter(StringIsNumber);

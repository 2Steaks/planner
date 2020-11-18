/** @format */
import * as R from 'ramda';
import { isArray, isNumber } from '@project/services';
import { OptionProps } from './Option';

const regex = R.curry((pattern, x) => new RegExp(x, pattern));

const toLowerRegex: any = R.compose(
  R.test,
  regex('g'),
  R.toLower,
  R.when(isNumber, R.toString) as any
);

const matchByLabel: any = (x = '') =>
  R.compose(toLowerRegex(x), R.toLower, R.propOr('', 'label'));

export const getOptionsBySearchTerm = (x: string) => R.filter(matchByLabel(x));

type getLabelByValueType = (x: string) => (options: OptionProps[]) => string;
export const getLabelByValue: getLabelByValueType = (x: string): any =>
  R.compose(R.prop('label') as any, R.find(R.propEq('value', x)));

export const toArray = R.ifElse(isArray, R.identity, Array.of);

export const setValue: any = R.curry(
  (multiple: boolean, value: string | number) =>
    R.ifElse(R.always(multiple), R.append(value), R.always(value))
);

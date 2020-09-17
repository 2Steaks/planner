/** @format */
import * as R from 'ramda';

export const getRows = (scrollHeight: number, rows: number) =>
  R.add(rows, Math.ceil(R.divide(scrollHeight, 16)));

export const getScrollHeight = R.pathOr(0, ['current', 'scrollHeight']);

export const calcScrollHeight = (
  textareaRef: HTMLTextAreaElement,
  baseScrollHeight: number
) => {
  return R.compose(
    R.subtract(getScrollHeight(textareaRef)),
    R.when(R.equals(0), R.always(getScrollHeight(textareaRef)))
  )(baseScrollHeight);
};

/** @format */

import { ChangeEvent } from 'react';
import * as R from 'ramda';

const getFile: (
  event: ChangeEvent<HTMLInputElement>
) => Blob | undefined = R.path(['target', 'files', 0]);

export const createFormData = (event: ChangeEvent<HTMLInputElement>) => {
  const formData = new FormData();
  formData.append('file', getFile(event) as any);
  return formData;
};

/** @format */

import { useState } from 'react';

export const useErrorHandler = (givenError: Error) => {
  const [error, setError] = useState(null);

  if (givenError) throw givenError;
  if (error) throw error;

  return setError;
};

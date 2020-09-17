/** @format */

// trace :: a -> a
export const trace = (name = '') => (x: any) => {
  console.log(name, x);
  return x;
};

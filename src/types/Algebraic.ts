/** @format */

// https://github.com/fantasyland/fantasy-land#functor
export interface IFunctor<T> {
  map<V>(fn: (val: T) => V): IFunctor<V>;
  'fantasy-land/map'<V>(fn: (val: T) => V): IFunctor<V>;
}

// https://github.com/fantasyland/fantasy-land#chain
export interface IChain<T> {
  chain<V>(fn: (val: T) => IChain<V>): IChain<V>;
  'fantasy-land/chain'<V>(fn: (val: T) => IChain<V>): IChain<V>;
}

// https://github.com/fantasyland/fantasy-land#applicative
export interface IApplicative<T> {
  ap<V>(afn: IApplicative<(val: T) => V>): IApplicative<V>;
  'fantasy-land/ap'<V>(afn: IApplicative<(val: T) => V>): IApplicative<V>;
}

// https://github.com/fantasyland/fantasy-land#monad
export interface IMonad<T> extends IFunctor<T>, IChain<T>, IApplicative<T> {
  readonly ['@@type']: string;
  bind<V>(fn: (val: T) => IMonad<V>): IMonad<V>;
  flatMap<V>(fn: (val: T) => IMonad<V>): IMonad<V>;
  chain<V>(fn: (val: T) => IMonad<V>): IMonad<V>;
  map<V>(fn: (val: T) => V): IMonad<V>;
  join<V>(): IMonad<V>; // only if T = IMonad<V>
  'fantasy-land/of'<V>(fn: (val: T) => IMonad<V>): IMonad<V>;
  'fantasy-land/chain'<V>(fn: (val: T) => IMonad<V>): IMonad<V>;
  /* These are monet-Monad-specific: */
  orSome<V>(fn: (val: T) => V): V;
  takeLeft(m: IMonad<T>): IMonad<T>;
  takeRight(m: IMonad<T>): IMonad<T>;
}

export interface IMaybe<T> extends IMonad<T> {
  orSome<V>(fn: (val: T) => V): V;
}

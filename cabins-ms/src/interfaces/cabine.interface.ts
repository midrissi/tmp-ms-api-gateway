export interface ICabinQueryOpts {
  $skip?: number;
  $top?: number;
  $filter?: any;
  user?: any;
}

export interface IPaginable<T> {
  top: number;
  skip: number;
  value: T[];
  count: number;
}

export interface ICabine {
  name: string;
  number: number;
}

export interface ICabinQueryOpts {
  $skip?: number;
  $top?: number;
  $filter?: any;
}

export interface ICabine {
  name: string;
  number: number;
}

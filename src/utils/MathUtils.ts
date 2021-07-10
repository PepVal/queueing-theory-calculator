export const PRECISION = 6;

export const Division = (numerator: number, denominator: number) => {
  // return parseFloat((numerator / denominator).toPrecision(PRECISION));
  return numerator / denominator;
};

export const Power = (base: number, elevation: number): number => {
  return Math.pow(base, elevation);
};

export const Factorial = (num: number) => {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
};

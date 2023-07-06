// Create our number formatter.
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

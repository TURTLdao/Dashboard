/*
  Copyright (c) 2023 - The TurtleDAO Platform
*/

export const tokensToAda = (tokenPrice) => {
  if (tokenPrice <= 0) {
    return 0; // Invalid tokenPrice
  }

  const out = 1 / tokenPrice;
  if (out < 1) {
    return out.toFixed(5);
  } else {
    return (1 / tokenPrice);
  }
};

export const calculatePercentage = (quantity, supply) => {
  return ((quantity / supply) * 100).toFixed(2);
};

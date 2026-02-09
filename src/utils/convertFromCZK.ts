function convertFromCZK(czk: number, rate: number, amount: number) {
  if (!rate || !amount) return 0;
  return czk / (rate / amount);
}

export { convertFromCZK };

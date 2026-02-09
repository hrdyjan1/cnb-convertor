function toNumber(value: string, label: string) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    throw new Error(`Invalid number for ${label}: "${value}"`);
  }

  return number;
}

export { toNumber };

function formatCurrency(value: number, currency: string, locale = 'cs-CZ') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export { formatCurrency };

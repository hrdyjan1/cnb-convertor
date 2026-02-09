import * as v from 'valibot';
import { toNumber } from '../../../utils/toNumber';
import { RateSchema, RatesResponseSchema } from '../schema/cnbSchema';

const HEADER_LINES = 2;
const DELIMITER = '|';
const CNB_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/' +
  'central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

function parseRate(line: string) {
  const parts = line.split(DELIMITER);

  if (parts.length !== 5) {
    throw new Error(`Invalid rate line: "${line}"`);
  }

  const [country, currency, amount, code, rate] = parts;

  return v.parse(RateSchema, {
    country,
    currency,
    amount: toNumber(amount, 'amount'),
    code,
    rate: toNumber(rate, 'rate'),
  });
}

async function fetchCnbRates() {
  const res = await fetch(CNB_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch CNB rates');
  }

  const text = await res.text();
  const [date, ...lines] = text.trim().split('\n');
  const rates = lines.slice(HEADER_LINES).map(parseRate);
  const parsed = { date, base: 'CZK', rates };

  return v.parse(RatesResponseSchema, parsed);
}

export { fetchCnbRates };

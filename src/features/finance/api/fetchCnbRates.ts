import { Platform } from 'react-native';
import * as v from 'valibot';
import { toNumber } from '../../../utils/toNumber';
import { RateSchema, RatesResponseSchema } from '../schema/cnbSchema';

const HEADER_LINES = 1;
const DELIMITER = '|';
const CNB_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/' +
  'central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const CORS_PROXY = 'https://corsproxy.io/?';

function getCnbUrl(): string {
  return Platform.OS === 'web'
    ? `${CORS_PROXY}${encodeURIComponent(CNB_URL)}`
    : CNB_URL;
}

function parseRateLine(line: string) {
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

function parseRatesText(text: string) {
  const [date, ...lines] = text.trim().split('\n');
  const rates = lines.slice(HEADER_LINES).map(parseRateLine);

  return { date, base: 'CZK' as const, rates };
}

async function fetchCnbRates() {
  const url = getCnbUrl();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch CNB rates: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  const parsed = parseRatesText(text);

  return v.parse(RatesResponseSchema, parsed);
}

export { fetchCnbRates };

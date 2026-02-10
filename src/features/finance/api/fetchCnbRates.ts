import { Platform } from 'react-native';
import * as v from 'valibot';
import { API_CONFIG, API_ENDPOINTS } from '../../../config/api';
import { toNumber } from '../../../utils/toNumber';
import { RateSchema, RatesResponseSchema } from '../schema/cnbSchema';

function getCnbUrl(): string {
  if (Platform.OS === 'web') {
    if (__DEV__) {
      return `${API_ENDPOINTS.CNB_RATES.CORS_PROXY}${encodeURIComponent(API_ENDPOINTS.CNB_RATES.DIRECT)}`;
    }
    return '/api/cnb-rates';
  }
  return API_ENDPOINTS.CNB_RATES.DIRECT;
}

function parseRateLine(line: string) {
  const parts = line.split(API_CONFIG.RATE_DELIMITER);

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
  const rates = lines.slice(API_CONFIG.HEADER_LINES).map(parseRateLine);

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

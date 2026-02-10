import { API_ENDPOINTS } from '../src/config/api';

export default async function handler(_, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(API_ENDPOINTS.CNB_RATES.DIRECT);
    const data = await response.text();
    res.status(200).send(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch' });
  }
}

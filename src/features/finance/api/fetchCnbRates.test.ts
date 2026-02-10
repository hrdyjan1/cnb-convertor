import { fetchCnbRates } from './fetchCnbRates';

global.fetch = jest.fn();

const SAMPLE_TEXT = `
27 Feb 2026
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Eurozone|euro|1|EUR|25.456
`;

describe('fetchCnbRates', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('parses rates correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => SAMPLE_TEXT,
    });

    const result = await fetchCnbRates();

    expect(result.date).toBe('27 Feb 2026');
    expect(result.base).toBe('CZK');
    expect(result.rates).toHaveLength(2);

    expect(result.rates[0]).toMatchObject({
      country: 'Australia',
      currency: 'dollar',
      amount: 1,
      code: 'AUD',
      rate: 15.123,
    });

    expect(result.rates[1]).toMatchObject({
      country: 'Eurozone',
      currency: 'euro',
      amount: 1,
      code: 'EUR',
      rate: 25.456,
    });
  });

  it('throws on invalid response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchCnbRates()).rejects.toThrow('Failed to fetch CNB rates');
  });

  it('throws on invalid rate line', async () => {
    const BAD_TEXT = `
27 Feb 2026
Country|Currency|Amount|Code|Rate
Bad|Line|WithoutEnough|Fields
`;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => BAD_TEXT,
    });

    await expect(fetchCnbRates()).rejects.toThrow(/Invalid rate line/);
  });
});

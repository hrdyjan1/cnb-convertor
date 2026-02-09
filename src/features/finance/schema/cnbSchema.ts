import * as v from 'valibot';

const RateSchema = v.object({
  currency: v.string(),
  country: v.string(),
  amount: v.number(),
  code: v.string(),
  rate: v.number(),
});

const RatesResponseSchema = v.object({
  date: v.string(),
  base: v.literal('CZK'),
  rates: v.array(RateSchema),
});

export { RateSchema, RatesResponseSchema };

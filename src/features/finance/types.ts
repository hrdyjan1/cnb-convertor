import type * as v from 'valibot';
import type { RateSchema, RatesResponseSchema } from './schema/cnbSchema';

type RatesResponse = v.InferOutput<typeof RatesResponseSchema>;
type Rate = v.InferOutput<typeof RateSchema>;

export type { Rate, RatesResponse };

import { z } from "zod";
import { CryptoResponseSchema, CurrencySchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoResponseSchema>
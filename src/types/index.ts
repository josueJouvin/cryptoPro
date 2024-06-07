import { z } from "zod";
import { CryptoPriceSchema, CryptoResponseSchema, CurrencySchema, PairSchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>
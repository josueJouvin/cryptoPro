import axios from "axios";
import { create } from "zustand";
import { CryptoResponseSchema} from "./schema/crypto-schema";
import { Cryptocurrency } from "./types";
import { devtools } from "zustand/middleware";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency
    fetchCryptos: () => Promise<void>
}
async function getCryptos(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    const {data : {Data}} = await axios(url)
    const result = CryptoResponseSchema.safeParse(Data)
    if(result.success){
        return result.data
    }
}
export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    }
})))
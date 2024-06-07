import { ChangeEvent, FormEvent, useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {
    const [error, setError] = useState("")
    const [pair, setPair] = useState<Pair>({
        currency: "",
        criptocurrency: ""
    })

    const cryptocurrencies = useCryptoStore(state => state.cryptocurrencies)
    const fetchData = useCryptoStore(state => state.fetchData)

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setPair({
            ...pair,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(Object.values(pair).includes("")){
            setError("Todos los campos son obligatorios")
            return
        }
        setError("")
        fetchData(pair)
        
    }

  return (
    <form className="form" onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                <option value="">-- Seleccione --</option>
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="field">
            <label htmlFor="criptocurrency">Moneda:</label>
            <select name="criptocurrency" id="criptocurrency" onChange={handleChange} value={pair.criptocurrency}>
                <option value="">-- Seleccione --</option>
                {cryptocurrencies.map((currency) => (
                    <option key={currency.CoinInfo.FullName} value={currency.CoinInfo.Name}>
                        {currency.CoinInfo.FullName}
                    </option>
                ))}
            </select>
        </div>

        <input type="submit" value="Cotizar" />
    </form>
  )
}

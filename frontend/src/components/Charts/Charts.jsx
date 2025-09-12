import { useState, useEffect } from 'react'
import AddButton from '../AddButton/AddButton'
import Menu from '../Menu/Menu'
import './Charts.css'

export default function Charts() {
    const [stocks, setStocks] = useState([])
    const [cash, setCash] = useState([])
    const [loaned, setLoaned] = useState([])
    const [stockValue, setStockValue] = useState([])
    const [fund, setFund] = useState([])
    
        useEffect(() => {
            getData().then((data) => {
                setStocks(data.stocks)
                setCash(data.cash.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }))
                setLoaned(data.loaned.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }))
                setStockValue(data.stock_value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }))
                setFund(data.fund.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }))
            })
        }, [])
    
        async function getData() {
            const endpoint = `http://${import.meta.env.VITE_ENDPOINT}/get-summary`
            const response = await fetch(endpoint)
            const json = await response.json()
            return json
        }

    return <>
        <Menu />
        <main>
            <div class="d-flex justify-content-around">
                <div class="rounded p-4 m-5 bg-purple">
                    <div class="card-title">CAIXA</div>
                    <div class="card-content">{cash}</div>
                </div>
                <div class="rounded p-4 m-5 bg-purple">
                    <div class="card-title">FUNDO</div>
                    <div class="card-content">{fund}</div>
                </div>
                <div class="rounded p-4 m-5 bg-purple">
                    <div class="card-title">EMPRÉSTIMOS</div>
                    <div class="card-content">{loaned}</div>
                </div>
                <div class="rounded p-4 m-5 bg-purple">
                    <div class="card-title">QNTD. DE AÇÔES</div>
                    <div class="card-content">{stocks}</div>
                </div>
                <div class="rounded p-4 m-5 bg-purple">
                    <div class="card-title">VALOR AÇÃO</div>
                    <div class="card-content">{stockValue}</div>
                </div>
            </div>
        </main>
        <AddButton/>
    </>
}

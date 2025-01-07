import { useState } from 'react'
import { useEffect } from 'react'
import './Loans.css'
import Menu from '../Menu/Menu'
import AddButton from '../AddButton/AddButton'

export default function Loans() {

    const [loans, setloans] = useState([])

	useEffect(() => {
		getData().then((data) => {
			setloans(data.loans)
		})
	}, [])

	async function getData() {
		const endpoint = 'http://localhost:8000/get-loans/'
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	return <>
        <Menu></Menu>
        <main>
            <h1 className="p-3 h1">Empréstimos</h1>
            <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Tomador</th>
                    <th scope="col">Total</th>
                    <th scope="col">Restante</th>
                    <th scope="col">Juros Mensal</th>
                    <th scope="col">Data</th>
                    <th scope="col">Vencimento</th>
                </tr>
            </thead>
            <tbody>
				{loans.map((loan) => (
					<tr key={loan.id}>
						<th scope="row">{loan.id}</th>
						<td>{loan.isActive? "Ativo" : "Quitado"}</td>
						<td>{loan.borrower}</td>
						<td>R$ {loan.value.toFixed(2)}</td>
						<td>R$ {loan.remaining_value.toFixed(2)}</td>
						<td>R$ {loan.fee_by_month.toFixed(2)}</td>
						<td>{loan.date}</td>
						<td>{loan.due_month}</td>
					</tr>
				))}
			</tbody>
            </table>
        </main>
    
        <AddButton></ AddButton>
    </>
}
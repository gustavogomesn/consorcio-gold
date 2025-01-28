import { useState } from 'react'
import { useEffect } from 'react'
import Menu from '../Menu/Menu'
import AddButton from '../AddButton/AddButton'

export default function Loans() {

    const [loans, setloans] = useState([])
    const [displayAll, setDisplayAll] = useState(false)

	useEffect(() => {
		getData().then((data) => {
			setloans(data.loans)
		})
	}, [])

	async function getData() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000/get-loans/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	function handleDisplayChange(){
		setDisplayAll(!displayAll)
	}

	return <>
        <Menu></Menu>
        <main>
            <h1 className="p-3 h1">Empréstimos</h1>
            <table className="table table-dark table-hover">
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="loan-confirmation" checked={displayAll} onChange={handleDisplayChange} />
					<label className="form-check-label" htmlFor="loan-confirmation">Mostrar todos</label>
				</div>
				<thead>
					<tr>
						<th scope="col">Data</th>
						<th scope="col">Situação</th>
						<th scope="col">Tomador</th>
						<th scope="col">Total</th>
						<th scope="col">Restante</th>
						<th scope="col">Juros Mensal</th>
						<th scope="col">Vencimento</th>
					</tr>
				</thead>
				<tbody>
					{loans.map((loan) => (
						displayAll ? <>
							<tr key={loan.id}>
								<td>{loan.date}</td>	
								<td>{loan.isActive? "Ativo" : "Quitado"}</td>
								<td>{loan.borrower}</td>
								<td>{loan.value.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.remaining_value.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.fee_by_month.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.due_month}</td>
							</tr>
						</> :
							loan.isActive && <>
							<tr key={loan.id}>
								<td>{loan.date}</td>	
								<td>Ativo</td>
								<td>{loan.borrower}</td>
								<td>{loan.value.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.remaining_value.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.fee_by_month.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
								</td>
								<td>{loan.due_month}</td>
							</tr>
							</>
							

					))}
				</tbody>
            </table>
        </main>
    
        <AddButton></ AddButton>
    </>
}
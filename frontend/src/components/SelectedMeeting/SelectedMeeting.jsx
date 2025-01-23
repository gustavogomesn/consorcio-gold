import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Menu from '../Menu/Menu'
import './SelectedMeeting.css'
import AddButton from '../AddButton/AddButton'
import LoanPayment from '../LoanPayment/LoanPayment'
import NewContrib from '../NewContrib/NewContrib'
import NewLoan from '../NewLoan/NewLoan'
import NewFine from '../NewFine/NewFine'

export default function SelectedMeeting() {
    const params= useParams()
    const meetingId = params.id
    const [temporaryEntries, setTemporaryEntries] = useState([])
    const [temporaryPayments, setTemporaryPayments] = useState([])
    const [feesToPay, setFeesToPay] = useState([])
    const [finesToPay, setFinesToPay] = useState([])
    const [loans, setLoans] = useState([])
    const [meetingDate, setMeetingDate] = useState('')

    useEffect(() => {
        getData().then((data) => {
            setTemporaryEntries(data.temporary_entries)
            setTemporaryPayments(data.temporary_payments)
            setFeesToPay(data.fees_to_pay)
            setFinesToPay(data.fines_to_pay)
            setLoans(data.loans)
            setMeetingDate(data.meeting_date)
        })
    }, [])

    async function getData() {
        const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000/show-meeting/${meetingId}`
        const response = await fetch(endpoint)
        const json = await response.json()
        return json
    }

    async function handleEndMeeting() {
        if (!confirm("Após encerrar uma reunião não poderá alterar seus dados, tem certeza?")){
            return
        }
        const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000/end-meeting/${meetingId}`
        const response = await fetch(endpoint)
        const json = await response.json()
        
        window.location.href = '/reunioes'
    }

    return <>
        <Menu />
        <main>
            <h1>Reunião do dia {meetingDate}</h1>
            <div className='d-flex flex-row gap-4'>
                <table className="table table-dark table-hover">
                <h2 className="p-3">Ações</h2>
                <thead>
                    <tr>
                    <th scope="col">Membro</th>
                    <th scope="col" style={{width: '20%'}}>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {temporaryEntries.map((entrie) => (
                        <tr key={entrie.id}>
                            <td>{entrie.member__name}</td>
                            <td style={{width: '20%'}}>{entrie.value}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <div className='col-4'>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3">Juros de empréstimos</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col" style={{width: '20%'}}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feesToPay.map((fee) => (
                            <tr key={fee.id}>
                                <td>{fee.borrower}</td>
                                <td style={{width: '20%'}}>R$ {fee.fee_by_month}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3">Novos Empréstimos</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col" style={{width: '20%'}}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.borrower}</td>
                                <td style={{width: '20%'}}>R$ {loan.value}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <div className='col-4'>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3">Multas</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col">Motivo</th>
                        <th scope="col" style={{width: '15%'}}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finesToPay.map((fine) => (
                            <tr key={fine.id}>
                                <td>{fine.member__name}</td>
                                <td>{fine.reason}</td>
                                <td style={{width: '15%'}}>R$ {fine.value}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3">Pagamento de Empréstimo</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col" style={{width: '20%'}}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temporaryPayments.map((loanPayment) => (
                            <tr key={loanPayment.id}>
                                <td>{loanPayment.member__name}</td>
                                <td style={{width: '20%'}}>R$ {loanPayment.value}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex gap-3 mt-3'>  
                <NewContrib />
                <NewLoan />
                <NewFine />
                <LoanPayment />
                <button className='btn btn-success' onClick={handleEndMeeting}>Encerrar</button>
            </div>
        </main>
        <AddButton />
    </>
}
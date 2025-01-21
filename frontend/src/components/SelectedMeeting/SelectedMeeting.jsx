import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Menu from '../Menu/Menu'
import './SelectedMeeting.css'
import AddButton from '../AddButton/AddButton'
import LoanPayment from '../LoanPayment/LoanPayment'
import NewContrib from '../NewContrib/NewContrib'
import NewLoan from '../NewLoan/NewLoan'

export default function SelectedMeeting() {
    const params= useParams()
    const meetingId = params.id
    const [temporaryEntries, setTemporaryEntries] = useState([])
    const [temporaryPayments, setTemporaryPayments] = useState([])
    const [loans, setLoans] = useState([])
    const [meetingDate, setMeetingDate] = useState('')

    useEffect(() => {
        getData().then((data) => {
            setTemporaryEntries(data.temporary_entries)
            setTemporaryPayments(data.temporary_payments)
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
        const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000/end-meeting/${meetingId}`
        const response = await fetch(endpoint)
        const json = await response.json()
        
        window.location.href = '/reunioes'
    }

    return <>
        <Menu />
        <main>
            <h1>Reunião do dia {meetingDate}</h1>
            <div className='d-flex flex-row gap-3'>
                <table className="table table-dark table-hover">
                <h2 className="p-3 h2">Ações</h2>
                <thead>
                    <tr>
                    <th scope="col">Membro</th>
                    <th scope="col">Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {temporaryEntries.map((entrie) => (
                        <tr key={entrie.id}>
                            <td>{entrie.member__name}</td>
                            <td>{entrie.value}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <div className='col-6'>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3 h2">Empréstimos</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.borrower}</td>
                                <td>R$ {loan.value}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <table className="table table-dark table-hover" id='table-loan'>
                    <h2 className="p-3 h2">Pagamento de Empréstimo</h2>
                    <thead>
                        <tr>
                        <th scope="col">Membro</th>
                        <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temporaryPayments.map((loanPayment) => (
                            <tr key={loanPayment.id}>
                                <td>{loanPayment.member__name}</td>
                                <td>R$ {loanPayment.value}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex gap-3'>  
                <NewContrib />
                <LoanPayment />
                <NewLoan />
                <button className='btn btn-success' onClick={handleEndMeeting}>Encerrar</button>
            </div>
        </main>
        <AddButton />
    </>
}
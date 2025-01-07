import { useState } from 'react'
import { useEffect } from 'react'
import AddButton from '../AddButton/AddButton'
import Menu from '../Menu/Menu'
import './Meetings.css'

export default function Meetings() {
    const [meetings, setMeetings] = useState([])

    useEffect(() => {
        getData().then((data) => {
            setMeetings(data.meetings)
        })
    }, [])

    async function getData() {
        const endpoint = 'http://localhost:8000/get-meetings/'
        const response = await fetch(endpoint)
        const json = await response.json()
        return json
    }

    return <>
        <Menu />
        <main>
            <h1 className="p-3 h1">Reuniões</h1>
            <table className="table table-dark table-hover meetings-table">
            <thead>
                <tr>
                <th scope="col">Data</th>
                <th scope="col">Ações compradas</th>
                <th scope="col">Empréstimos tomados</th>
                <th scope="col">Juros</th>
                <th scope="col">Multas</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting) => (
                    <tr key={meeting.id}>
                        <th scope="row">{meeting.date}</th>
                        <td>{meeting.stocks}</td>
                        <td>{meeting.loans}</td>
                        <td>{meeting.fees}</td>
                        <td>{meeting.fine}</td>
                        <td>{meeting.finished ? 'Encerrada' : 'Em andamento'}</td>
                        <td>
                            <div className='d-flex'>
                                {meeting.finished ? <>
                                    </>
                                    : 
                                    <>
                                    <button data-meeting-id={meeting.id}>Editar</button>
                                    <button data-meeting-id={meeting.id}>Apagar</button>
                                    <button data-meeting-id={meeting.id}>Encerrar</button>
                                    </>
                                    }
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </main>
        <AddButton/>
    </>
}
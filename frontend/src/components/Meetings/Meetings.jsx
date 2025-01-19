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
        const endpoint = 'http://192.168.1.130:8000/get-meetings/'
        const response = await fetch(endpoint)
        const json = await response.json()
        return json
    }

    async function handleDeleteMeeting(e) {    
        const meetingId = e.target.getAttribute('data-meeting-id');
        try {
            const response = await fetch("http://192.168.1.130:8000/delete-meeting/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: meetingId }),
            });
    
            if (response.ok) {
                // Update the state to remove the deleted meeting
                setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== parseInt(meetingId)));
            } else {
                console.error("Failed to delete meeting");
            }
        } catch (error) {
            console.error("Error deleting meeting:", error);
        }
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
                        <td>{meeting.loans_made}</td>
                        <td>{meeting.fees}</td>
                        <td>{meeting.fine}</td>
                        <td>{meeting.finished ? 'Encerrada' : 'Em andamento'}</td>
                        <td>
                            <div className='d-flex'>
                                {meeting.finished ? <></>
                                    : 
                                    <>
                                    <button data-meeting-id={meeting.id}>Editar</button>
                                    <button data-meeting-id={meeting.id} onClick={handleDeleteMeeting} >Excluir</button>
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
        <AddButton meetings={meetings} setMeetings={setMeetings}/>
    </>
}
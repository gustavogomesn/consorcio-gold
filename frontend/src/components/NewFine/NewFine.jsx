import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Fade from 'react-bootstrap/Fade';
import { useState, useEffect } from 'react'

function NewFine() {
    const [isOpen, setIsOpen] = useState(false)
    const [fineAccepted, setFineAccepted] = useState(false)
    const [ feesValue, setFeesValue] = useState(0)
    const [ maxLoanAllowed, setMaxLoanAllowed] = useState(0)
    const [ borrowerId, setBorrowerId] = useState(0)
    const [members, setMembers] = useState([])
    const [meetings, setMeetings] = useState([])


	useEffect(() => {
		getMembers().then((data) => {
			setMembers(data.members)
		})
		getMeetings().then((data) => {
			setMeetings(data.meetings)
		})
	}, [])

	async function getMembers() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000//get-members/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	async function getMeetings() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000//get-meetings/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

    function handleCancelButton(e){
        e.preventDefault()
        setIsOpen(false)
    }

    function handleConfirmationChange(e){
        setFineAccepted(!fineAccepted)
    }

    async function handleFineSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target.form)
        
        try {
            const response = await fetch(`http://${import.meta.env.VITE_ENDPOINT}:8000/new-fine/`, {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error creating fine:", error);
        }

        alert('Multa registrada, será cobrada na próxima reunião')
        setIsOpen(false)
    }


    return (
    <>
        <button onClick={() => setIsOpen(true)} className='btn btn-primary' >Nova Multa</button>
        <Fade in={isOpen} timeout={200}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 centered" transition>
                <div className="p-4">
                <DialogPanel className="rounded bg-secondary p-3 shadow" style={{'width': '500px'}}>
                    <DialogTitle className="font-bold">Nova Multa</DialogTitle>
                    <form className='d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="member-input">Membro</label>
                            <select className='form-control' id='member-input' name='member_id' required>
                                <option selected disabled>Selecione o membro</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="meeting-input">Reunião</label>
                            <select className='form-control' id='meeting-input' name='meeting_id' required>
                                {meetings.map((meeting) => (
                                    !meeting.finished && <option key={meeting.id} value={meeting.id}>{meeting.date}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Motivo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="reason"
                                name="reason"
                                placeholder="EX: Atraso"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fine-value">Valor(R$)</label>
                            <input 
                                type="number" 
                                min='0' 
                                className="form-control" 
                                id="fine-value"
                                name="fine-value"
                                placeholder="Valor"
                                />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="loan-confirmation" checked={fineAccepted} onChange={handleConfirmationChange} />
                            <label className="form-check-label" htmlFor="loan-confirmation">Membro ciente do pagamento da multa na próxima reunião</label>
                        </div>
                        <div className="d-flex gap-2">
                            <button className='btn btn-light' onClick={handleCancelButton}>Cancelar</button>
                            <button className="btn btn-success" disabled={!fineAccepted} onClick={handleFineSubmit}>Multar</button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog>
        </Fade>
    </>
    )
}

export default NewFine;
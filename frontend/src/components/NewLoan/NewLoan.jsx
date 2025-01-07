import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Fade from 'react-bootstrap/Fade';
import { useState, useEffect } from 'react'
import './NewLoan.css'

function NewLoan() {
    const [isOpen, setIsOpen] = useState(false)
    const [loanConfirmed, setLoanConfirmed] = useState(false)
    const [ feesValue, setFeesValue] = useState(0)
    const [ maxLoanAllowed, setMaxLoanAllowed] = useState(0)
    const [ borrowerId, setBorrowerId] = useState(0)
    const [members, setMembers] = useState([])
    const [meetings, setMeetings] = useState([])
    let currentMonth = new Date().getMonth()
    let dueMonthNumber = new Date(new Date().setMonth(currentMonth + 6))
    let dueMonthName = capitalize(dueMonthNumber.toLocaleString('pt-br', {'month': 'long'}))


	useEffect(() => {
		getMembers().then((data) => {
			setMembers(data.members)
		})
		getMeetings().then((data) => {
			setMeetings(data.meetings)
		})
	}, [])

	async function getMembers() {
		const endpoint = 'http://localhost:8000/get-members/'
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	async function getMeetings() {
		const endpoint = 'http://localhost:8000/get-meetings/'
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

    function capitalize(str){
        return String(str[0]).toUpperCase() + String(str).slice(1);
    }

    function handleCancelButton(e){
        e.preventDefault()
        setIsOpen(false)
    }

    // each member can take a 3x loan, based on value of your stocks, soon i need to migrate this logic to backend
    function handleChangeOfBorrower(e){
        const selectedOption = e.target.options[e.target.selectedIndex]
        let stocks = selectedOption.getAttribute('data-stocks')
        let id = selectedOption.getAttribute('data-borrower-id')
        let max = stocks * 50 * 3
        setMaxLoanAllowed(max)
        setBorrowerId(id)
    }

    function handleChangeOfValue(e){
        let fees = e.target.value * 0.03
        setFeesValue(fees)
    }

    function handleConfirmationChange(e){
        setLoanConfirmed(!loanConfirmed)
    }

    async function handleLoanSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target.form)
        
        try {
            const response = await fetch("http://localhost:8000/new-loan/", {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error creating loan:", error);
        }
        
        window.location.reload()
        
    }


    return (
    <>
        <button onClick={() => setIsOpen(true)} className='dropdown-item' >Novo Empréstimo</button>
        <Fade in={isOpen} timeout={200}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 centered" transition>
                <div className="p-4">
                <DialogPanel className="rounded bg-secondary p-3 shadow" style={{'width': '500px'}}>
                    <DialogTitle className="font-bold">Novo Empréstimo</DialogTitle>
                    <form className='d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="borrower-input">Tomador</label>
                            <select className='form-control' id='borrower-input' name='borrower' onChange={handleChangeOfBorrower}>
                                <option selected disabled>Selecione o tomador</option>
                                {members.map((member) => (
                                    <option value={member.name} data-borrower-id={member.id} data-stocks={member.stocks}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                        <input className='d-none' name='member_id' value={borrowerId}></input>
                        <div className="form-group">
                            <label htmlFor="meeting-input">Reunião</label>
                            <select className='form-control' id='meeting-input' name='meeting_id' required>
                                {meetings.map((meeting) => (
                                    !meeting.finished && <option value={meeting.id}>{meeting.date}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="loan-value">Valor(R$)</label>
                                <input 
                                    type="number" 
                                    min='0' 
                                    className="form-control" 
                                    id="loan-value"
                                    name="loan-value"
                                    placeholder="Valor"
                                    onChange={handleChangeOfValue}
                                    />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="max-loan-value">Máximo permitido(R$)</label>
                                <input 
                                    className="form-control" 
                                    id="max-loan-value"
                                    value={maxLoanAllowed}
                                    onChange={handleChangeOfValue}
                                    disabled
                                    />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label htmlFor="loan-value">Juros Mensal(R$)</label>
                                <input className='form-control' value={feesValue} disabled/>
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="loan-value">Mês de Vencimento</label>
                                <input className='form-control' value={dueMonthName} disabled/>
                            </div>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="loan-confirmation" checked={loanConfirmed} onChange={handleConfirmationChange} />
                            <label className="form-check-label" htmlFor="loan-confirmation">Tomador ciente do pagamento de Juros e vencimento?</label>
                        </div>
                        <div className="d-flex gap-2">
                            <button className='btn btn-light' onClick={handleCancelButton}>Cancelar</button>
                            <button className="btn btn-success" disabled={!loanConfirmed} onClick={handleLoanSubmit}>Emprestar</button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog>
        </Fade>
    </>
    )
}

export default NewLoan;
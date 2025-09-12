import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Fade from 'react-bootstrap/Fade';
import { useState, useEffect } from 'react'

function LoanPayment() {
    let [isOpen, setIsOpen] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [loans, setLoans] = useState([])
    const [loanValue, setLoanValue] = useState(0)
    const [paymentValue, setPaymentValue] = useState(0)

	useEffect(() => {
		getLoans().then((data) => {
			setLoans(data.loans)
		})
		getMeetings().then((data) => {
			setMeetings(data.meetings)
		})
	}, [])

	async function getLoans() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}/get-loans/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	async function getMeetings() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}/get-meetings/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}


    function handleCancelButton(e){
        e.preventDefault()
        setIsOpen(false)
    }

    function handleChangeOfBorrower(e){
        const selectedOption = e.target.options[e.target.selectedIndex]
        let lValue = parseFloat(selectedOption.getAttribute('data-loan-value'))
        setLoanValue(lValue)
    }

    function handleChangeOfPayment(e){
        let payment = e.target.value
        setPaymentValue(payment)
    }

    async function handleLoanPaymentSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target.form)
        
        try {
            const response = await fetch(`http://${import.meta.env.VITE_ENDPOINT}/loan-payment-temporarily/`, {
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
        <button onClick={() => setIsOpen(true)} className='btn btn-primary' >Pagamento de empréstimo</button>
        <Fade in={isOpen} timeout={200}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 centered" transition>
                <div className="p-4">
                <DialogPanel className="rounded bg-secondary p-3 shadow" style={{'width': '500px'}}>
                    <DialogTitle className="font-bold">Pagamento de empréstimo</DialogTitle>
                    <form className='d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="borrower-input">Tomador</label>
                            <select className='form-control' id='borrower-input' name='loan_id' onChange={handleChangeOfBorrower}>
                                <option selected disabled>Selecionar tomador</option>
                                {loans.map((loan) => (
                                    loan.isActive && <option key={loan.id} value={loan.id} data-loan-value={loan.remaining_value}>{loan.borrower}</option>
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
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="loan-value">Valor Restante(R$)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="loan-value"
                                    name="loan-value"
                                    value={loanValue}
                                    disabled
                                    />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="max-loan-value">Pagamento(R$)</label>
                                <input 
                                    type='number'
                                    max={loanValue}
                                    min='0'
                                    className="form-control" 
                                    name='payment'
                                    value={paymentValue}
                                    placeholder='Pagamento'
                                    onChange={handleChangeOfPayment}
                                    />
                            </div>
                            <small>Restará R${loanValue-paymentValue} após o pagamento</small>
                        </div>
                        <div className="d-flex gap-2 mt-2">
                            <button className='btn btn-light' onClick={handleCancelButton}>Cancelar</button>
                            <button className="btn btn-success" onClick={handleLoanPaymentSubmit}>Pagar</button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog>
        </Fade>
    </>
    )
}

export default LoanPayment;

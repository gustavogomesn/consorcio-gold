import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Fade from 'react-bootstrap/Fade';
import { useState, useEffect } from 'react'

function NewMeeting() {
    let [isOpen, setIsOpen] = useState(false)
    let [meetingConfirmed, setMeetingConfirmed] = useState(false)

    function handleCancelButton(e){
        e.preventDefault()
        setIsOpen(false)
    }


    function handleConfirmationChange(e){
        setMeetingConfirmed(!meetingConfirmed)
    }

    async function handleMeetingSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target.form)
        
        try {
            const response = await fetch(`http://${import.meta.env.VITE_ENDPOINT}:8000/new-meeting/`, {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error creating meeting:", error);
        }
        
        window.location.reload()
        
    }


    return (
    <>
        <button onClick={() => setIsOpen(true)} className='dropdown-item' >Nova Reunião</button>
        <Fade in={isOpen} timeout={200}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 centered" transition>
                <div className="p-4">
                <DialogPanel className="rounded bg-secondary p-3 shadow" style={{'width': '500px'}}>
                    <DialogTitle className="font-bold">Nova Reunião</DialogTitle>
                    <form className='d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="meeting-date">Data</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="meeting-date"
                                name="meeting-date"
                                />
                        </div>
                        <div className="form-check m-2">
                            <input type="checkbox" className="form-check-input" id="meeting-confirmation" checked={meetingConfirmed} onChange={handleConfirmationChange} />
                            <label className="form-check-label" htmlFor="meeting-confirmation">Membros de acordo</label>
                        </div>
                        <div className="d-flex gap-2">
                            <button className='btn btn-light' onClick={handleCancelButton}>Cancelar</button>
                            <button className="btn btn-success" disabled={!meetingConfirmed} onClick={handleMeetingSubmit}>Agendar</button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog>
        </Fade>
    </>
    )
}

export default NewMeeting;
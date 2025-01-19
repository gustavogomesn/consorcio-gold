import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Fade from 'react-bootstrap/Fade';
import { useState, useEffect } from 'react'

function NewContrib() {
    let [isOpen, setIsOpen] = useState(false)
    let [fileUploaded, setFileUploaded] = useState(false)
    const [meetings, setMeetings] = useState([])

    useEffect(() => {
		getMeetings().then((data) => {
			setMeetings(data.meetings)
		})
	}, [])

    async function getMeetings() {
		const endpoint = 'http://192.168.1.130:8000/get-meetings/'
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

    function handleCancelButton(e){
        e.preventDefault()
        setIsOpen(false)
    }


    function handleFileChange(e){
        setFileUploaded(!fileUploaded)
    }

    async function handleFileSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target.form)
        
        try {
            const response = await fetch("http://192.168.1.130:8000/upload-contribs/", {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error creating meeting:", error);
        }
        
        // window.location.reload()
        
    }


    return (
    <>
        <button onClick={() => setIsOpen(true)} className='dropdown-item' >Novos Aportes</button>
        <Fade in={isOpen} timeout={200}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 centered" transition>
                <div className="p-4">
                <DialogPanel className="rounded bg-secondary p-3 shadow" style={{'width': '500px'}}>
                    <DialogTitle className="font-bold">Novos Aportes</DialogTitle>
                    <Description>
                        Baixar, preencher e fazer upload do modelo a seguir, preenchendo todos valores da coluna ações.
                        <br></br>
                        <a href='http://192.168.1.130:8000/contrib-model-download' className='text-warning'>Download</a>
                    </Description>
                    <form className='d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="meeting-input">Reunião</label>
                            <select className='form-control' id='meeting-input' name='meeting_id' required>
                                {meetings.map((meeting) => (
                                    !meeting.finished && <option key={meeting.id} value={meeting.id}>{meeting.date}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3 form-group">
                            <label class="form-label">Importar modelo</label>
                            <input class="form-control" type="file" name='file' onChange={handleFileChange} />
                        </div>
                        <div className="d-flex gap-2">
                            <button className='btn btn-light' onClick={handleCancelButton}>Cancelar</button>
                            <button className="btn btn-success" disabled={!fileUploaded} onClick={handleFileSubmit}>Agendar</button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog>
        </Fade>
    </>
    )
}

export default NewContrib;
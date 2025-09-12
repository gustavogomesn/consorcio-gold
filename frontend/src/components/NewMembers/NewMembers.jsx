import React, { useState } from "react";

const NewMembers = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`http://${import.meta.env.VITE_ENDPOINT}/upload-members/`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("File uploaded successfully!");
                window.location.href = '/'
            } else {
                setMessage(`Error: ${data.status}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("An error occurred while uploading the file.");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center flex-column mt-5 gap-4">
            <h2>Cadastrar Usuários</h2>
            <p style={{width: '400px'}}>Faça download do modelo abaixo, preencha com todos os membros participantes, não deixando nenhuma columa em branco e envie o arquivo preenchido no formulário abaixo</p>
            <a href={`http://${import.meta.env.VITE_ENDPOINT}/members-model-download`} className='text-warning'>Download</a>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group">
                    <input type="file" onChange={handleFileChange} className="form-control" />
                    <button type="submit" className="btn btn-secondary mt-2">Upload</button>
                </div>
            </form>
            {message && <>
                <span>{message}</span>
                <a href="/" className="text-success">Voltar para página inicial</a>
            </>}
        </div>
    );
};

export default NewMembers;

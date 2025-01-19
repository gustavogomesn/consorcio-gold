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
            const response = await fetch("http://192.168.1.130:8000/upload-members/", {
                method: "POST",
                body: formData,
            });

            console.log(response)
            const data = await response.json();
            if (response.ok) {
                setMessage("File uploaded successfully!");
            } else {
                setMessage(`Error: ${data.status}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("An error occurred while uploading the file.");
        }
    };

    return (
        <div>
            <h2>Upload Members File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewMembers;

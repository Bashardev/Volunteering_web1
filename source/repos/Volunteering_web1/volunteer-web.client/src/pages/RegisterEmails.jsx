import React, { useState, useEffect } from "react";

function RegisterEmails({ fname }) {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        if (!fname) return; // Prevent fetching if fname is empty or undefined

        fetch('https://localhost:7149/api/Register/firstname?fname=${fname}') // Correct API URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setEmails(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [fname]);

    return (
        <div>
            <h1>Emails for Fname: {fname || "Unknown"}</h1>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>{email}</li>
                ))}
            </ul>
        </div>
    );
}

export default RegisterEmails;

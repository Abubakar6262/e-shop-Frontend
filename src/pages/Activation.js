import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../server';

const Activation = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${BASE_URL}/api/v1/users/activation`, {
                        activation_token
                    });
                    console.log(res.data.message);
                    setMessage(res.data.message);
                    window.notify(res.data.message, "success");
                } catch (error) {
                    console.log("Error at activation token check =>", error.response);
                    setError(true);
                    if (error.response && error.response.data.message === "Token expired") {
                        setMessage("Your token has expired. Please request a new one.");
                        window.notify("Your token has expired. Please request a new one.", "error");
                    } else {
                        setMessage("Invalid token. Please try again.");
                        window.notify("Invalid token. Please try again.", "error");
                    }
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {error ? <p>{message}</p> : <p>Your account has been created successfully</p>}
        </div>
    );
};

export default Activation;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../server';

const ShopActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${BASE_URL}/api/v1/shop/activation`, {
                        activation_token
                    });
                    console.log(res);
                    console.log(res.data.message);
                    window.notify(res.data.message, "success")
                } catch (error) {
                    console.log("Error at activation token check =>", error);
                    setError(true);
                    window.notify("Token may be expired", "error")
                }
            }
            activationEmail();
        }
    }, [])
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {error ?
                <p>   Your Token is Expired</p>
                : <p>Your account has been created successfully </p>

            }
        </div>
    )
}

export default ShopActivationPage
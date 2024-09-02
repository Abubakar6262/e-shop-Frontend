import React, { useEffect } from 'react'
import SignUp from '../components/SingUp/SingUp.js'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === true) {
            return navigate("/");
        }
    }, [])
    return (
        <SignUp />
    )
}

export default SignUpPage
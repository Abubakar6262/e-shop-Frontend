import React, { useEffect } from 'react'
import Login from '../components/Login/Login.js'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      return navigate("/");
    }
  }, [])

  return (
    <Login />
  )
}

export default LoginPage
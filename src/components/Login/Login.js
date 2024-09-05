import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import styles from "../../styles/styles"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from '../../server'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    axios.post(`${BASE_URL}/api/v1/users/login`, userData, {
      withCredentials: true,
    })
      .then((res) => {
        // console.log("Response from login ", res);
        window.notify("Login success", "success");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("somthing went wrong at login user", err);
        window.notify(err?.response?.data?.message, "error");
      })
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-500'>
          Login to user account
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email Address</label>
              <div className='mt-1'>
                <input type="email" name='email' id='email' required autoComplete='email' className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='mt-1 relative'>
                <input type={isVisible ? "password" : "text"} name='password' id='password' required autoComplete='current-password' className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={password} onChange={e => setPassword(e.target.value)} />

                {isVisible
                  ? <AiOutlineEye
                    className='absolute right-2 top-2 cursor-pointer'
                    size={25}
                    onClick={() => setIsVisible(!isVisible)}
                  />
                  : <AiOutlineEyeInvisible
                    className='absolute right-2 top-2 cursor-pointer'
                    size={25}
                    onClick={() => setIsVisible(!isVisible)}
                  />
                }
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input type="checkbox" name='remember-me' id='remember-me' className='h-3 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded' />
                <label htmlFor="remember-me" className="ml-2  block text-sm text-gray-500"> Remember Me</label>
              </div>
              <div className={`${styles.noramlFlex}`}>
                <a href="/" className='font-medium text-blue-600 hover:text-blue-500'>Forgot Password</a>
              </div>
            </div>

            <div>
              <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 focus:bg-blue-700'>
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to={"/sign-up"} className='text-blue-600 pl-2'> Sing-Up</Link>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
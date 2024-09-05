import React, { useState } from 'react'
import { BASE_URL } from '../../server'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/styles'

const CreateShop = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isVisible, setIsVisible] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [address, setAddress] = useState("")
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const shopData = {
            name, email, password, avatar, phoneNumber, zipCode, address
        }
        axios.post(`${BASE_URL}/api/v1/shop/create`, shopData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // console.log("Response ", response.data.message);
                // alert(response.data.message)
                window.notify(response?.data?.message, "info")
                setName("");
                setEmail("");
                setPassword("");
                setAvatar(null);
                setAddress("");
                setPhoneNumber("");
                setZipCode("");
                // navigate("/login")
            })
            .catch(error => {
                console.log('There was an error creating the Shop:', error?.response?.data?.message);
                window.notify("Somthing went wrong at created Shop", "error")
            });

        // console.log("This submit function of sign up", shopData);
    }
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }
    return (
        <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-[40rem]'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-500'>
                    Register as a seller
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Shop Name</label>
                            <div className='mt-1'>
                                <input type="text" name='name' id='name' required autoComplete='name' className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className='block text-sm font-medium text-gray-700'>Phone Number</label>
                            <div className='mt-1'>
                                <input type="tel" name='phoneNumber' id='phoneNumber' required className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email Address</label>
                            <div className='mt-1'>
                                <input type="email" name='email' id='email' required autoComplete='email' className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className='block text-sm font-medium text-gray-700'>Address</label>
                            <div className='mt-1'>
                                <input type="text" name='address' id='address' required className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="zipCode" className='block text-sm font-medium text-gray-700'>Zip Code</label>
                            <div className='mt-1'>
                                <input type="number" name='zipCode' id='zipCode' required className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm' value={zipCode} onChange={e => setZipCode(e.target.value)} />
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

                        <div>
                            <label htmlFor="avater" className='block text-sm font-medium text-gray-700' ></label>
                            <div className='mt-2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    {avatar
                                        ? <img src={URL.createObjectURL(avatar)} alt='avatar' className='h-full w-full object-cover rounded-full' />
                                        : <RxAvatar className="h-8 w-8" />
                                    }
                                </span>
                                <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                    <span>Upload a file</span>
                                    <input type="file" name="avatar" id="file-input" accept='.jpg,.jpeg,.png' onChange={handleFileInputChange} className='sr-only' />
                                </label>
                            </div>
                        </div>

                        <div>
                            <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 focus:bg-blue-700'>
                                Submit
                            </button>
                        </div>
                        <div className={`${styles.noramlFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to={"/seller-login"} className='text-blue-600 pl-2'>Sign in</Link>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateShop
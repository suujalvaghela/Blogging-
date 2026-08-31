import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [error, setError] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault()

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = isSignup ? 'login' : 'signup';
    await axios
      .post(`http://localhost:3000/api/user/${value}`, formData)
      .then(res => {
        console.log(res.data.user)
        localStorage.setItem('token', res.data.token)
        if (localStorage.getItem('token')) {
          navigate('/')
        }
      })
      .catch(error => {
        console.log("Login Error: ", error.response?.data?.message)
        setError(error?.response?.data?.message)
      })
  }

  return (
    <div className='w-screen flex justify-center items-center h-screen bg-amber-500'>
      <form onSubmit={handleSubmit}>
        <div className='bg-amber-200 text-center font-bold text-3xl flex-wrap flex-1 sm:flex-2 lg:flex-3 rounded-2xl gap-7 p-5 h-80 py-3 flex justify-center items-center'>
          {!isSignup && <div className='flex flex-col gap-3'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className='bg-red-400 rounded h-13 text-xl pl-2 pb-1'
              onChange={handleChange}
              required
            />
          </div>}
          <div className='flex flex-col gap-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className='bg-red-400 rounded h-13 text-xl pl-2 pb-1'
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name='password'
              id='password'
              className='bg-red-400 rounded h-13 text-xl pl-2 pb-1'
              onChange={handleChange}
              required />
          </div>
          <div className='w-full'>
            <button type='submit' className='bg-green-400 rounded-2xl p-4 hover:bg-blue-400 hover:text-red-500'>
              Submit
            </button>
          </div>
          <div className='font-light'>
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className='text-center underline'>
          {!isSignup
            ? <div onClick={() => setIsSignup(true)}>
              <Link>Already have an account?</Link>
            </div>
            : <div onClick={() => setIsSignup(false)}>
              <Link>Don't have an account?</Link>
            </div>}
        </div>
      </form>
    </div>
  )
}

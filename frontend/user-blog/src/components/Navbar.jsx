import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    let token = localStorage.getItem("token")
    const [authenticate, setAuthenticate] = useState(token ? true : false)

    useEffect(() => {
        setAuthenticate(token ? true : false)
    }, [token])

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        setAuthenticate(false)
        navigate('/')
    }

    return (
        <div>
            <header className='flex items-center justify-between px-5 w-screen bg-gray-600 text-1xl text-white py-3'>
                <div>User-Blog</div>
                <nav>
                    <ul className='flex gap-5'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to={!authenticate ? '/' : '/blogs'}>Blogs</Link></li>
                        <li>{authenticate
                            ? <button onClick={handleLogOut}>Logout</button>
                            : <Link to='/login'>Login</Link>}</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

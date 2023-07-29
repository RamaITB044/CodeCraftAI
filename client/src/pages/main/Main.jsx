import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();
    return (
        <div className='Main'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Main
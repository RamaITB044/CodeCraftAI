import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import "./Main.scss"

const Main = () => {
    const navigate = useNavigate();
    return (
        <div className='Main'>
            <Sidebar/>
            <Outlet />
        </div>
    )
}

export default Main
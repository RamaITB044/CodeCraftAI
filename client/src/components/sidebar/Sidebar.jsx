import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import logout from '../../assets/icons/logout.svg';
import codz_logo from '../../assets/icons/app-logo.png';
import './Sidebar.scss'
import { sidebarRoutes } from './sidebarRoutes';

const Sidebar = () => {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);

    const handleHover = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };
    return (
        <motion.div
            initial={{ width: 60 }}
            animate={{ width: isExpanded ? 200 : 75 }}
            transition={{ duration: 0.3 }}
            onHoverStart={handleHover}
            onHoverEnd={handleMouseLeave}
            className="Sidebar">
            
            <div className='logo'>
                <img src={codz_logo} alt="Codz" />
            </div>

            <div className="routes-con">
                <div className="routes">
                    {sidebarRoutes.map((route) => {
                        return <NavLink to={route.path} key={route.name}>
                                <motion.div className='route-box'>
                                    <img src={route.icon} alt={route.name} className="route-icon" />
                                    {isExpanded && <p className="route-name">{route.name}</p>}
                                </motion.div>
                        </NavLink>
                    })}
                </div>
                <div className="route-box">
                    <img src={logout} alt="Logout" />
                    {isExpanded && <p className="route-name">Logout</p>}
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar
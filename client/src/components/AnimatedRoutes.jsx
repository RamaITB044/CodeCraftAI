import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Pricing from '../pages/pricing/Pricing';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                {/* <Route path="/app" element={<Main />}>
                    <Route path="/app" element={<Home />} />
                    <Route path="/app/write" element={<Write />} />
                    <Route path="/app/story/:id" element={<Story />} />
                </Route> */}
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
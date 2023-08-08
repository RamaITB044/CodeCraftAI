import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PricingBox from '../components/pricingBox/PricingBox';
import Dashboard from '../pages/dashboard/Dashboard';
import Main from '../pages/main/Main';
import Playground from '../pages/playground/Playground';
import Pricing from '../pages/pricing/Pricing';
import Codes from '../pages/codes/Codes';
import { useDispatch } from 'react-redux';
import { metaData } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
import { magic } from '../utils/magic';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
import Axios from 'axios';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

function AnimatedRoutes() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const isLoggedIn = await magic.user.isLoggedIn();
            if (isLoggedIn) {
                const userData = await magic.user.getMetadata();
                const newToken = await magic.user.getIdToken({ lifespan: 24 * 60 * 60 });
                Cookies.set('token', newToken);
                dispatch(metaData(userData));
                console.log(userData);

                const getUserDataFromServer = async () => {
                    const didToken = Cookies.get("token");
                    try {
                        const resp = await Axios.get(APP_SERVER + "/api/user/data", {
                            headers: {
                                Authorization: "Bearer " + didToken
                            }
                        });
                        console.log(resp.data.userData)
                        dispatch(setUser(resp.data.userData));
                    } catch (error) {
                        toast.error("Something went wrong!")
                        console.log(error);
                    }
                }

                getUserDataFromServer();
            }
        };
        fetchData();
    }, []);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/app" element={<Main />}>
                    <Route path="/app" element={<Dashboard />} />
                    <Route path="/app/playground" element={<Playground />} />
                    <Route path="/app/pricing" element={<PricingBox />} />
                    <Route path="/app/codes" element={<Codes />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
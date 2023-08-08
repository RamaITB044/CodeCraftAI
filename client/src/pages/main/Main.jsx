import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import "./Main.scss";
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserDataFromServer = async () => {
        const didToken = Cookies.get("token");
        try {
            const resp = await Axios.get(APP_SERVER + "/api/user/data", {
                headers: {
                    Authorization: "Bearer " + didToken
                }
            });
            dispatch(setUser(resp.data.user));
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("Called Main compoent");
    },[])

    return (
        <div className='Main'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Main
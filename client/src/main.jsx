import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import "./Main.scss";
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Overlay, Image, AspectRatio } from '@mantine/core';
import { magic } from '../../utils/magic';


const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMetadata = useSelector((state) => state.auth.value);
 
  useEffect(() => {
    if (!userMetadata?.issuer) {
      navigate("/login");
    }
  }, [navigate]);

 
  return (
    <div className='Main'>
      {/* {globalLoading && <Overlay color="#000" opacity={0.85} />} */}
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Main
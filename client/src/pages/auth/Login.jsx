import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import { Grid, Skeleton, Container, Center, Input } from '@mantine/core';
import codzLogo from '../../assets/icons/codz-logo.svg'
import emailIcon from '../../assets/icons/email.svg'
import workIcon from '../../assets/icons/work.svg'
import userIcon from '../../assets/icons/user.svg'
import loginCard from '../../assets/gradients/login-card.png'
import loginLeft from '../../assets/gradients/login-left.png'
import loginRight from '../../assets/gradients/login-right.png'
import { metaData, logout } from '../../slices/authSlice';
import { setUser } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { magic } from '../../utils/magic';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
import Axios from 'axios'
import Footer from '../../components/footer/Footer';
import rolling_logo from '../../assets/images/rolling.svg'
import Navbar from '../../components/navbar/Navbar';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const emailId = useSelector((state)=>state.auth.value.email)
  const userMetadata = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (userMetadata?.issuer) {
      navigate("/app");
    }
  }, [userMetadata?.issuer])

  const handleLogin = async () => {
    setLoading(true);
    if (email === "") {
      toast.error("Please provide your email!");
      setLoading(false);
    } else {
      //check valid email
      if (!email.includes("@")) {
        toast.error("Please enter a valid email address!");
        setLoading(false);
        return;
      }
      try {
        //checking if user exists
        const resp = await Axios.post(APP_SERVER + "/api/auth/check", {
          email: email
        });
        if (!resp.data.status) {
          toast.error("Please register first!");
          setLoading(false);
          return navigate("/register");
        }
        // Trigger Magic link to be sent to user
        let didToken = await magic.auth.loginWithMagicLink({
          email,
        });

        // Validate didToken with server
        try {
          const loginResp = await Axios.post(APP_SERVER + "/api/auth/login", { email }, {
            headers: {
              Authorization: "Bearer " + didToken
            }
          });
          if (loginResp.status === 200) {
            dispatch(setUser(await loginResp.data.user));
            dispatch(metaData(await loginResp.data.metadata));
            Cookies.set('token', didToken);
            setLoading(false);
            navigate("/app");
          }

        } catch (err) {
          toast.error("Login attempt failed. Please try again later!");
          setLoading(false);
          console.log(err);
        }


      } catch (err) {
        toast.error("Login attempt failed. Please try again later!");
        setLoading(false);
        console.log(err);
      }
    }
  }

  return (
    <motion.div
    className="Login"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}>

      <Navbar login={true}/>
      <img src={loginLeft} className="login-left" alt="gradient" />
      <img src={loginCard} className="login-center" alt="gradient" />
      <img src={loginRight} className="login-right" alt="gradient" />
      <Container size={1200}>
        <div className="auth-con">
          <div className="auth-title">
            <p>Unleash Your Coding</p>
            <p>Powers Now!</p>
          </div>

          <div className="auth-card">
            <img src={codzLogo} alt="Codz Logo" />
            <p className='heading'>Welcome back</p>
            <p className='sub-heading'>Login to your account</p>

            <div className="auth-inp">

              <div className="inp-box">
                <img src={emailIcon} alt="Email" />
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

            </div>

            {loading ? <img src={rolling_logo} alt='Loading...' className='rolling'/> :
              <div className="auth-btn nav-btn" onClick={handleLogin}>
                Login
              </div>}

            <p className='auth-link'>New to Codz? <a onClick={() => navigate("/register")}>Sign up</a></p>

          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </Container>

    </motion.div>
  )
}

export default Login
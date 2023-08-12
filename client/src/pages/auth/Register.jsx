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
import Axios from 'axios'
import { useSelector } from 'react-redux';
const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userMetadata = useSelector((state) => state.auth.value); 

  useEffect(() => {
    if (userMetadata.issuer) {
      navigate("/app");
    }
  },[])

  const handleRegistration = async () => {
    setLoading(true);
    if (email === "" || name === "" || profession === "") {
        alert("Please fill all the fields!");
        setLoading(false);
    } else {
        //check valid email
        if (!email.includes("@")) {
            alert("Please enter a valid email !");
            setLoading(false);
            return;
        }
        try {
            //checking if user exists
            const check = await Axios.post(APP_SERVER + "/api/auth/check", {
                email: email
            });
            if (check.data.status) {
                setLoading(false);
                return toast.error("User already exists");
            }
            const resp = await Axios.post(APP_SERVER + "/api/auth/register", {
                email,
                userName: name,
                profession
            });
            if (resp.status === 201) {
                alert("Registration Successful");
                setLoading(false);
                navigate("/login");
            }
        } catch (err) {
            alert("Something went wrong!");
            setLoading(false);
            console.log(err);
        }
    }
}

  return (
    <div className='Register'>
     <nav className="navbar">
        <div className="navbar-content">
          <img onClick={()=>navigate("/")} src={fullLogo} alt="logo"/>
          <div className="nav-links">
            <div onClick={()=>navigate("/pricing")}>Pricing</div>
            <a onClick={()=>navigate("/register")}><div className="nav-btn">Use Now</div></a>
          </div>
        </div>
      </nav>
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
            <p className='heading'>Create an account</p>
            <p className='sub-heading'>Sign up to create your account</p>

            <div className="auth-inp">
              <div className="inp-box">
                <img src={userIcon} alt="User" />
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

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

              <div className="inp-box">
                <img src={workIcon} alt="Profession" />
                <input
                  type="text"
                  placeholder="Profession"
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="auth-btn nav-btn" onClick={handleRegistration}>
                  Register
            </div>

            <p className='auth-link'>Already have an account? <a onClick={()=>navigate("/login")}>Login</a></p>
          </div>
        </div>
      </Container>

    </div>
  )
}

export default Register
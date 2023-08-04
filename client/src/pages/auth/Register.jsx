import React, { useState } from 'react'
import './Auth.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import { Grid, Skeleton, Container, Center, Input } from '@mantine/core';
import codzLogo from '../../assets/icons/codz-logo.svg'
import emailIcon from '../../assets/icons/email.svg'
import workIcon from '../../assets/icons/work.svg'
import userIcon from '../../assets/icons/user.svg'

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");

  return (
    <div className='Register'>
      <nav className="navbar">
        <div className="navbar-content">
          <img src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div onClick={() => navigate("/pricing")}>Pricing</div>
            <a href=""><div className="nav-btn">Use Now</div></a>
          </div>
        </div>
      </nav>

      <Container size={1200}>
        <div className="auth-con">
          <div className="auth-title">
            <p>Unleash Your Coding</p>
            <p>Powers Now!</p>
          </div>

          <div className="auth-card">
            <img src={codzLogo} alt="Codz Logo" />
            <p className='heading'>Welcome</p>
            <p className='sub-heading'>Signup to create your account</p>

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

            <div className="auth-btn nav-btn">
                  Register
            </div>

            <p className='auth-link'>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </Container>

    </div>
  )
}

export default Register
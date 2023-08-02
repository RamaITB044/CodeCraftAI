import React from 'react'
import './Auth.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'

const Login = () => {
  return (
    <div className='Auth'>
      <nav className="navbar">
        <div className="navbar-content">
          <img src={fullLogo} alt="logo"/>
          <div className="nav-links">
            <div onClick={()=>navigate("/pricing")}>Pricing</div>
            <a href=""><div className="nav-btn">Use Now</div></a>
          </div>
        </div>
      </nav>
      <div className="box">
        <div className="box-content">
        <p>
        Unleash Your Coding Powers Now
        </p>
        </div>
      </div>
    </div>
  )
}

export default Login
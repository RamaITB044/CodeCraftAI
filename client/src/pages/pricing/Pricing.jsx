import React from 'react'
import './Pricing.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'

const Pricing = () => {
  return (
    <div className='Pricing'>
      <nav className="navbar">
        <div className="navbar-content">
          <img src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div><a href="">Pricing</a></div>
            <div><a href="">Feature</a></div>
            <a href=""><div className="nav-btn">Use Now</div></a>
          </div>
        </div>
      </nav>
      <section className='header-con'>
        <p className='title'>
          Pricing
        </p>
        <br />
        <p className='sub-title'>
          Pick a plan that fits your workflow
        </p>
      </section>
    </div>
  )
}

export default Pricing
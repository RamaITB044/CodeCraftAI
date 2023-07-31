import React from 'react'
import './Pricing.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import { useNavigate } from "react-router-dom"

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <div className='Pricing'>
      <nav className="navbar">
        <div className="navbar-content">
          <img src={fullLogo} alt="logo" onClick={() => navigate("/")}/>
          <div className="nav-links">
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

      <section className="pricing-content">
        <div className='card'>
          <div className='card-head'>
            <p className="card-title">
              Basic
            </p>
            <p className="card-sub-title">
              For individuals just getting started
            </p>
            <p className="price">
              FREE
            </p>
            <div className="card-btn">
              Get Started
            </div>
          </div>
          <div className="card-features">
            <ul>
              <li><span>Upto 5 file saves</span></li>
              <li><span>100 free credits/week</span></li>
              <li><span>AI code generation</span></li>
              <li><span>AI code debugging</span></li>
            </ul>
          </div>
        </div>
        <div className='card'>
          <div className='card-head'>
            <p className="card-title" id='pro'>
              Pro
            </p>
            <p className="card-sub-title">
              For individuals who need to become PRO
            </p>
            <div className="price-con">
              <div className="price">
                $10
              </div>
              <div className='currency'>
                <p>USD</p>
                <p>per month</p>
              </div>
            </div>
            <div className="card-btn" id='pro-btn'>
              Buy Now
            </div>
          </div>
          <div className="card-features">
            <ul>
              <li><span>Unlimmited File Saves</span></li>
              <li><span>2x free credits/week</span></li>
              <li><span>AI code optimization</span></li>
              <li><span>AI code summarization</span></li>
              <li><span>AI code generation</span></li>
              <li><span>AI code debugging</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
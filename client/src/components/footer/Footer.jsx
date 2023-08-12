import React from 'react'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import './Footer.scss'
const Footer = () => {
  return (
    <div className="footer-con">
                    <div className='logo-box'>
                        <img src={fullLogo} alt="" />
                    </div>
                <p>©2023 Codz</p>
                <div className='socials-con'>
                    <a href="" className='join-link' target="_blank" rel='noreferrer'><img className='disc' src={fullLogo} alt="Discord" /></a>
                    <a href="" className='join-link'  target="_blank" rel='noreferrer'><img className='disc' src={fullLogo} alt="GitHub" /></a>
                </div>
            </div>
  )
}

export default Footer
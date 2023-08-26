import React from 'react'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import twitterLogo from '../../assets/icons/twitter.svg'
import githubLogo from '../../assets/icons/github.svg'
import './Footer.scss'
const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-con">
        <div className='logo-box'>
          <img src={fullLogo} alt="" />
        </div>
        <p>©2023 Codz</p>
        <div className='socials-con'>
          {/* <a href="" className='join-link' target="_blank" rel='noreferrer'><img className='disc' src={githubLogo} alt="GitHub" /></a> */}
          <a href="https://twitter.com/Codz_AI" className='join-link' target="_blank" rel='noreferrer'><img className='disc' src={twitterLogo} alt="Twitter" /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer
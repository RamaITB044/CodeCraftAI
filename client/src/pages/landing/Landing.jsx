import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import dmatter from '../../assets/images/darkmater.gif'
import coding from '../../assets/images/coding.svg'
import next_gen from '../../assets/images/next-gen.svg'
import openai from '../../assets/images/openai.png'
import playground from '../../assets/images/codz-playground.svg'
import playground_chat from '../../assets/images/codz-chat.svg'
import dotted_grid from '../../assets/images/dotted_grid.svg'
import generation from '../../assets/icons/generation.svg'
import summarization from '../../assets/icons/summarization.svg'
import debugging from '../../assets/icons/debugging.svg'
import optimization from '../../assets/icons/optimization.svg'
import codz_logo from '../../assets/icons/codz-logo.svg'
import dotted_circle from '../../assets/images/dotted-circle.svg'
import codz_grid from '../../assets/images/codz-grid.svg'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="Landing">
    
      <nav className="navbar">
        <div className="navbar-content">
          <img src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div><a href=""> Pricing</a></div>
            <div><a href="">Feature</a></div>
            <a href=""><div className="nav-btn">Use Now</div></a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="title">
            <h1>
              THE
              FUTURE.
            </h1>
          </div>
          <div className="sub-title">
            <p>
              The ultimate coding platform that lets you unleash the full potential of your coding skills with the power of our cutting edge Artificial Intelligence
            </p>
          </div>
        </div>
      </section>

      <section className="hero-graphics">
        <img src={next_gen} alt="Next-Gen" />
        <img src={dmatter} alt="Dark Matter" />
        <img src={coding} alt="Coding" />
      </section>

      <section className="intro">
        <div className="intro-content">
          <div className="intro-desc">
            <p className="intro-title">Introducing <span id="gradient">Codz</span></p>
            <p className="intro-sub-title">Codz is revolutionizing the way people write code.
              Our platform leverages the latest advances in artificial intelligence, powered by OpenAI, to help developers of all skill levels optimize, generate, and debug code more efficiently.
              Experience the future of coding with Codz today.
            </p>
          </div>
          <div className="intro-graphic">
            <img src={openai} alt="OpenAI" />
          </div>
        </div>
      </section>

      <section className="playground">
        <div className="playground-content">
          <div className="playground-graphic">
            <img src={playground} alt="Coding" />
            <img src={playground_chat} alt="Chat" />
          </div>
          <div className="playground-desc">
            <p className="playground-title"><span id='gradient'>AI</span>-Powered Code Editor</p>
            <br />
            <p className="playground-sub-title">Experience the future of coding with Codz's AI-powered code editor. Our innovative platform offers a range of AI-action buttons, including code optimization, generation, and debugging, all designed to enhance your coding experience.  </p>
            <br />
            <p className="playground-sub-title"> Our AI bot <span id='gradient'>Codemon</span>, provides real-time support and guidance, making it easier than ever to write high-quality code. </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-content">
          <p className="feature-title">
            Effortless Coding, Maximum Productivity
          </p>
          <br />
          <p className="feature-sub-title">
            Codz's advanced AI technology is the backbone of our platform, providing cutting-edge features and functionality to help you write better code in less time
          </p>
          <div className="card-con">
            <div className='card'>
              <img src={optimization} alt="optimization" />
              <br />
              <p className='card-title'>
                Code Optimization
              </p>
              <p className='card-sub-title'>
              Get more out of your code with Codz's intelligent optimization algorithms, designed to boost performance and reduce bloat.
              </p>
            </div>
            <div className='card'>
              <img src={generation} alt="generation" />
              <p className='card-title'>
                Code Generation
              </p>
              <p className='card-sub-title'>
              From simple functions to complex algorithms, Codz's code generation feature makes it easy to generate high-quality code quickly and easily.
              </p>
            </div>
            <div className='card'>
              <img src={debugging} alt="debugging" />
              <p className='card-title'>
                Code Debugging
              </p>
              <p className='card-sub-title'>
              Don't let bugs slow you down - with Codz's code debugging feature, you can quickly identify and solve issues in your code.
              </p>
            </div>
            <div className='card'>
              <img src={summarization} alt="summarization" />
              <p className='card-title'>
                Code Summarization
              </p>
              <p className='card-sub-title'>
              Say goodbye to tedious code reviews - with Codz's code summarization feature, you can quickly understand the structure and flow of your code.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="join">
        <div className="join-content">
          <img src={codz_logo} alt="logo" />
          {/* <img src={dotted_circle} alt="circle" /> */}
          <p className="join-title">
            Unleash your ultimate coding powers using <span id='gradient'>Codz</span> today!
          </p>
          <a href=""><div className="join-btn">Join Now</div></a>
        </div>
      </section>

      <footer className='footer'>
        <div className="footer-content">
          <img src={codz_grid} alt="Grid" />
        </div>
      </footer>

    </div>
  )
}

export default Landing
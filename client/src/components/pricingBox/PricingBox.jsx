import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './PricingBox.scss'
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import { createQR, encodeURL } from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import { shopAddress, usdcAddress } from "../../utils/addresses";
import { calculateAmount } from '../../utils/calculateAmount';
import Checkout from '../checkout/Checkout';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Axios from 'axios';
import confirm_logo from '../../assets/images/confirm.svg'
import rolling_logo from '../../assets/images/rolling.svg'
import { motion } from 'framer-motion';


const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const PricingBox = () => {
  const [showPricing, setShowPricing] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();
  const userMetadata = useSelector((state) => state.auth.value);

  const handlePayment = async () => {
    if (!userMetadata?.issuer) {
      toast.error("Please login first!");
      return;
    }

    try {
      const resp = await Axios.get(APP_SERVER + "/api/user/checkSubscription", {
        headers: {
          Authorization: "Bearer " + Cookies.get('token')
        }
      });
      if (resp.data.status) {
        toast.error("You already have the PRO plan!");
        return;
      }
      setShowPricing(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
     <motion.div
      className="pricingBox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {showConfirmation ? <>
        <section className='header-con'>
          <p className='title'>
            Payment Successful!
          </p>
          <br />
          <p className='sub-title'>
            Thanks for buying the PRO plan! We can't wait to see what you code!
          </p>
        </section>
        <section className='payment-box'>
          <img src={confirm_logo} alt="Confirmed" className='confirm-tick' />
        </section>

      </> : showPricing ?
        <>
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
                  <li><span>100 free credits</span></li>
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
                  {/* <div className='currency'>
                    <p>USD</p>
                    <p>per month</p>
                  </div> */}
                </div>
                <div className="card-btn" id='pro-btn' onClick={handlePayment}>
                  Buy Now
                </div>
              </div>
              <div className="card-features">
                <ul>
                  <li><span>Unlimited File Saves</span></li>
                  <li><span>1000 credits</span></li>
                  <li><span>AI code optimization</span></li>
                  <li><span>AI code summarization</span></li>
                  <li><span>AI code generation</span></li>
                  <li><span>AI code debugging</span></li>
                </ul>
              </div>
            </div>
          </section>
        </>
        :
        <>
          <section className='header-con'>
            <p className='title'>
              Checkout
            </p>
            <br />
            <p className='sub-title'>
              Currently we only accept USDC payments using <span className='solana-text'>Solana Pay.</span> 
            </p>
          </section>
          <Checkout price={10} setShowPricing={setShowPricing} setShowConfirmation={setShowConfirmation}/>
        </>
      }
    </motion.div>
  )
}

export default PricingBox
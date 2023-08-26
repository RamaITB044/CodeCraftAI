import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Checkout.scss'
import { useNavigate } from "react-router-dom"
import { createQR, encodeURL, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { shopAddress, usdcAddress } from "../../utils/addresses";
import { calculateAmount } from '../../utils/calculateAmount';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Axios from 'axios';
import { useDispatch } from "react-redux"
import { setPlan, setCredit } from '../../slices/userSlice';
import rolling_logo from '../../assets/images/rolling.svg'

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Checkout = ({ price, setShowPricing, setShowConfirmation }) => {
    const [loading, setLoading] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: 450,
        height: 450,
    });

    useEffect(() => {
        console.log(windowSize.width);
        function handleResize() {
            // Set window width/height to state
            if (window.innerWidth < 700) {
                setWindowSize({
                    width:  350,
                    height: 350,
                });
            }
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    },[])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Unique address that we can listen for payments to
    const reference = useMemo(() => Keypair.generate().publicKey, []);
    const amount = calculateAmount(price);

    // Get a connection to Solana devnet
    const network = WalletAdapterNetwork.Devnet
    const endpoint = clusterApiUrl(network)
    const connection = new Connection(endpoint)

    // ref to a div where we'll show the QR code
    const qrRef = useRef(null);

    const urlParams = {
        recipient: shopAddress,
        splToken: usdcAddress,
        amount: calculateAmount(10),
        reference: reference,
        label: "Codz Pro Subscription",
        message: "Thank you for your purchase!",
    }

    // Encode the params into the format shown
    const url = encodeURL(urlParams)
    console.log({ url })

    // Show the QR code
    useEffect(() => {
        console.log("Shop address: ", shopAddress);
        console.log("USDC address: ", usdcAddress);
        const qr = createQR(url, windowSize.width)
        if (qrRef.current && amount.isGreaterThan(0)) {
            qrRef.current.innerHTML = ''
            qr.append(qrRef.current)
        }
    });

    // Check every 0.5s if the transaction is completed
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                // Check if there is any transaction for the reference
                const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
                // Validate that the transaction has the expected recipient, amount and SPL token
                // await validateTransfer(
                //     connection,
                //     signatureInfo.signature,
                //     {
                //         recipient: shopAddress,
                //         amount,
                //         splToken: usdcAddress,
                //         reference,
                //     },
                //     { commitment: 'confirmed' }
                // )
                if (signatureInfo.confirmationStatus === 'processed' || signatureInfo.confirmationStatus === 'confirmed') {
                    setLoading(true);
                }
                if (signatureInfo.confirmationStatus === 'finalized') {
                    try {
                        const resp = await Axios.patch(APP_SERVER + "/api/user/subscribe", {
                            payment_signature: signatureInfo.signature,
                        }, {
                            headers: {
                                Authorization: "Bearer " + Cookies.get('token')
                            }
                        });
                        if (resp.status === 200) {
                            setLoading(false);
                            dispatch(setPlan(resp.data.plan));
                            dispatch(setCredit(resp.data.credits));
                            toast.success('Payment processed successfully!');
                            setShowConfirmation(true);
                            return;
                        }
                    } catch (error) {
                        setLoading(false);
                        console.log(error);
                        toast.error('Payment failed!');
                    }
                }
            } catch (e) {
                if (e instanceof FindReferenceError) {
                    // No transaction found yet, ignore this error
                    return;
                }
                if (e instanceof ValidateTransferError) {
                    // Transaction is invalid
                    console.error('Transaction is invalid', e)
                    return;
                }
                console.error('Unknown error', e)
            }
        }, 500)
        return () => {
            clearInterval(interval)
        }
    }, [amount])

    return (
        <div className='qr-con'>
            {loading ? <img src={rolling_logo} alt="rolling" className="rolling-logo" /> :
                <>
                    <div ref={qrRef} />
                    <div className="card-btn" onClick={() => setShowPricing(true)}>
                        Cancel
                    </div>
                </>}
        </div>
    )
}

export default Checkout
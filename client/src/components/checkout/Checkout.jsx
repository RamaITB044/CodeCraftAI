import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { createQR, encodeURL, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { shopAddress, usdcAddress } from "../../utils/addresses";
import { calculateAmount } from '../../utils/calculateAmount';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import toast from 'react-hot-toast';

const Checkout = ({ price }) => {
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();
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
        const qr = createQR(url, 512)
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
                if (signatureInfo.confirmationStatus === 'finalized') {
                    setConfirmed(true)
                    toast.success('Payment confirmed!');
                    navigate('/');
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
        <div>
            <h1>Checkout</h1>
            <div ref={qrRef} />
        </div>
    )
}

export default Checkout
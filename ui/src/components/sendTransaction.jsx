import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { getBlockExplorerTransactionLink } from '../util/index'

export const SendTransaction = () => {
    const [data, setData] = useState('')
    const [amount, setAmount] = useState('1')
    const [recipient, setRecipient] = useState('')
    const [result, setResult] = useState('')

    const onSend = useCallback(() => {
        const run = async () => {
            const transactionHash = await api.send(recipient, amount, data)
            setResult(transactionHash)
        }

        run()
    }, [data, amount, recipient])

    const handleChange = f => (event) => f(event.target.value)

    if (result) {
        return <>
            <div className="box">
                Transaction Hash
            </div>
            <div className="box">
                {result}<br />
                <a href={getBlockExplorerTransactionLink(result)} target='_blank'>See on block explorer</a>
            </div>
            <div>
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            </div>
        </>
    }

    return (
        <div className="App">
            <div className="box">
                Send Transaction
            </div>
            <div >
                <input placeholder="Recipient" value={recipient} onChange={handleChange(setRecipient)} />
            </div>
            <div >
                <input placeholder="Amount" value={amount} onChange={handleChange(setAmount)} />
            </div>
            {/*
            comment out till test it
            <div >
                <textarea placeholder="Hex Data" value={data} onChange={handleChange(setData)} />
            </div>*/}
            <div>
                <button onClick={onSend}>Send</button>
            </div>
        </div>
    )
}

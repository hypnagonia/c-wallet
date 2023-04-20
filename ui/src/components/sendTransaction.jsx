import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { getBlockExplorerTransactionLink } from '../util/index'

export const SendTransaction = () => {
    const [data, setData] = useState('')
    const [amount, setAmount] = useState('1')
    const [recipient, setRecipient] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')

    const onSend = useCallback(() => {
        if (loading) {
            return
        }

        setLoading(true)
        const run = async () => {
            try {
                const transactionHash = await api.send(recipient, amount, data)
                setResult(transactionHash)
            } catch (e) { }
            setLoading(false)
        }

        run()
    }, [data, amount, recipient])

    const handleChange = f => (event) => f(event.target.value)

    if (result) {
        return <>
            <div className="box small">
                Transaction Hash:<br />
                <b>{result}</b><br />
                <a href={getBlockExplorerTransactionLink(result)} target='_blank'>See on block explorer</a>
            </div>
            <div className="box small">
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            </div>
        </>
    }

    return (
        <div className="box">
            <div >
                <input placeholder="Recipient" value={recipient} onChange={handleChange(setRecipient)} />
            </div>
            <div className="margintop">
                <input placeholder="Amount" value={amount} onChange={handleChange(setAmount)} />
            </div>
            {/*
            comment out till test it
            <div >
                <textarea placeholder="Hex Data" value={data} onChange={handleChange(setData)} />
            </div>*/}
            {!loading && <div className="margintop">
                <button onClick={onSend}>Send</button>
            </div>}
        </div>
    )
}

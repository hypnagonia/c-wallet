import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'

export const Wallet = () => {
    const [balance, setBalance] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)

    useEffect(() => {
        const run = async () => {
            const b = await api.getBalance()
            setBalance(b)
        }

        run()
    }, [])

    useEffect(() => {
        const run = async () => {
            // todo it's create or get now
            const w = await api.createWallet()
            setWallet(w)
        }

        run()
    }, [])

    const displayedBalance = balance ? ethers.formatEther(balance) : '-'

    return (
        <div className="App">
            <div className="box">
                Wallet
                <br />
                <span className="small">
                    {wallet}
                </span>
            </div>
            <div className="box">
                Balance
                <br />
                <span className="small">
                    {displayedBalance}&nbsp;ETH
                </span>
            </div>
            <div >
                <Link to={'/sign'}>
                    <button>Sign Data</button>
                </Link>
            </div>
            <div>
                <Link to={'/send'}>
                    <button>Send Transaction</button>
                </Link>
            </div>
        </div>
    )
}

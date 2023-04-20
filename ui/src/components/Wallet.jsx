import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { backendUrl } from '../util'

export const Wallet = () => {
    const [balance, setBalance] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [authorized, setAuthorized] = useState(api.isAuthorized())

    useEffect(() => {
        if (!authorized) {
            return
        }

        const run = async () => {
            const b = await api.getBalance()
            setBalance(b)
        }

        run()
    }, [wallet])

    useEffect(() => {
        if (!authorized) {
            return
        }

        const run = async () => {
            // todo it's create or get now
            const w = await api.createWallet()
            setWallet(w)
        }

        run()
    }, [])

    const displayedBalance = balance ? ethers.formatEther(balance) : '-'

    if (!authorized) {
        return <>
            <div>
                <a href={`${backendUrl}/auth/google`}>
                    Sign In with Google
                </a>
            </div>
        </>
    }

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
            <div>
                <button onClick={api.logout}>Log out</button>
            </div>
        </div>
    )
}

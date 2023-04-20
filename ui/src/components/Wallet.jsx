import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { backendUrl } from '../util'

export const Wallet = () => {
    const [balance, setBalance] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const isAuthorized = api.isAuthorized()

    useEffect(() => {
        if (!isAuthorized) {
            return
        }

        const run = async () => {
            const b = await api.getBalance()
            setBalance(b)
        }

        run()
    }, [wallet])

    useEffect(() => {
        if (!isAuthorized) {
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

    if (!isAuthorized) {
        return <>
            <div className="textcenter">
                <a href={`${backendUrl}/auth/google`} className="nounderline">
                    Sign In with Google
                </a>
            </div>
        </>
    }

    return (
        <div>
            <div className="box small">
                Wallet: {wallet}<br />
                Balance: <b>{displayedBalance}</b>&nbsp;ETH<br />
                <br />
                <Link to={'/sign'}>
                    <a href="#">Sign Data</a><br />
                </Link>
                <Link to={'/send'}>
                    <a href="#">Send Transaction</a><br />
                </Link>
                <a href="#" onClick={api.logout}>Log Out</a>
            </div>
        </div>
    )
}

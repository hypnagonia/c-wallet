import { useEffect, useState, useCallback } from 'react'
import * as api from '../api/client'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'

export const SignPayload = () => {
    const [data, setData] = useState('')
    const [signature, setSignature] = useState('')

    const onSign = useCallback(() => {
        const run = async () => {
            const s = await api.sign(data)
            setSignature(s)
        }

        run()
    }, [data])

    const handleChange = (event) => setData(event.target.value)

    if (signature) {
        return <>
            <div className="box">
                Signature
            </div>
            <div className="box">
                {signature}
            </div>
            <div>
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            </div>
        </>
    }

    return (<>
        <div className="box">
            Sign Data
        </div>
        <div >
            <textarea placeholder="Data" onChange={handleChange} value={data} />
        </div>
        <div>
            <button onClick={onSign}>Sign</button>
        </div>
    </>
    )
}

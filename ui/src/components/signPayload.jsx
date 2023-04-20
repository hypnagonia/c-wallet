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
            <div className="box small">
                Signature:<br />
                <b>{signature}</b>
                <div>
                    <Link to={'/'}>
                        <button className="margintop">Back</button>
                    </Link>
                </div>
            </div>
        </>
    }

    return (<>
        <div className="small box">
            <textarea placeholder="Data" onChange={handleChange} value={data} />
            <button className="margintop" onClick={onSign}>Sign</button>
        </div>
    </>
    )
}

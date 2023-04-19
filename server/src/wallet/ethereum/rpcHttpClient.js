
const headers = { 'Content-Type': 'application/json' }

const query = (
    rpcUrl,
    method,
    params,
) => {
    const body = {
        jsonrpc: '2.0',
        id: 1, // never let me down
        method,
        params,
    }

    const payload = {
        method: 'post',
        body: JSON.stringify(body),
        headers,
    }

    console.log({rpcUrl})

    return global.fetch(rpcUrl, payload)
        .then((res) => res.json())
        .then((res) => {
            if (res.result) {
                return res.result
            }
            if (res.error) {
                throw new Error('RPC Error: ' + JSON.stringify(res.error))
            }
            throw new Error('No response data')
        })
}

const rpcHttpClient = (config) => {
    const getBalance = (address) => {
        return query(config.url, 'eth_getBalance', [address, 'latest'])
    }

    return {
        getBalance
    }
}

module.exports = {
    rpcHttpClient
}
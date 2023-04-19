const ethers = require('ethers')

const ethereumWallet = (config, logger) => {
    const rpcClient = new ethers.JsonRpcProvider(config.rpc.url)

    const createWallet = () => {
        const wallet = ethers.Wallet.createRandom()
        // delete as we are never going to use it in the future
        delete wallet.mnemonic

        return { address: wallet.address, privateKey: wallet.privateKey }
    }

    const getBalance = async (address) => {
        if (!ethers.isAddress(address)) {
            throw new Error(`ethereum hex address expected, got ${address}`)
        }

        const balance = await rpcClient.getBalance(address)
        return balance.toString()
    }

    const sign = async (privateKey, payload) => {
        const w = new ethers.Wallet(privateKey)
        const bytes = ethers.toUtf8Bytes(payload)
        const digest = ethers.keccak256(bytes)
        const signature = await w.signMessage(digest)

        return signature
    }

    const sendTransaction = async (privateKey, amount, to, data = '0x') => {
        if (!ethers.isAddress(to)) {
            throw new Error(`ethereum hex address expected, got ${to}`)
        }

        const w = new ethers.Wallet(privateKey, rpcClient)

        // todo estimate gas price
        const transaction = {
            gasLimit: config.gasLimit,
            gasPrice: ethers.parseUnits(config.gasPrice.toString(), 'gwei'),
            to: '0x1234567890123456789012345678901234567890',
            value: ethers.parseEther(amount),
            data
        }
        
        const res = await w.sendTransaction(transaction)
        return res.hash
    }

    return {
        createWallet,
        getBalance,
        sign,
        sendTransaction
    }
}

module.exports = {
    ethereumWallet
}
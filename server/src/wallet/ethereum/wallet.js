const ethers = require('ethers')
const { rpcHttpClient } = require('./rpcHttpClient')

const ethereumWallet = (config, logger) => {
    const client = rpcHttpClient(config.rpc)

    const createWallet = () => {
        const wallet = ethers.Wallet.createRandom()
        // delete as we are never going to use it in the future
        delete wallet.mnemonic

        return { wallet: wallet.address, privateKey: wallet.privateKey }
    }

    const getBalance = async (address) => {
        if (!ethers.isAddress(address)) {
            throw new Error(`ethereum hex address expected, got ${address}`)
        }

        const hexBalance = await client.getBalance(address)
        return BigInt(hexBalance).toString()
    }

    const sign = (privateKey, payload) => { }

    return {
        createWallet,
        getBalance,
        sign
    }
}

module.exports = {
    ethereumWallet
}
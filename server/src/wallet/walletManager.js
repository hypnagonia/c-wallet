const { ethereumWallet } = require('./wallet/ethereum')

const walletManager = (config, logger, storage) => {
    const wallet = ethereumWallet()

    const getWallet = (userId) => {
        const w = wallet.createWallet()

        return w
    }


    const getBalance = (userId) => {

    }

    const createWallet = (userId) => {
        const w = wallet.createWallet()
        console.log(w)
        return w
    }

    const signPayload = (userId) => {

    }

    const sendBalance = (userId) => {

    }

    return {
        createWallet,
        signPayload,
        sendBalance,
        getBalance
    }
}

module.exports = {
    walletManager
}
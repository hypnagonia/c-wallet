const { ethereumWallet } = require('./ethereum/wallet')

/* 
wallet manager is blockchain agnostic and knows nothing about platform specifics
glues storage, wallet, and normalized user creds from controllers only
*/
const walletManager = (config, logger, storage) => {
    const wallet = ethereumWallet(config, logger)

    const getWallet = (userId) => {
        const w = wallet.createWallet()

        return w
    }


    const getBalance = (userId) => {
        return wallet.getBalance('0xa5241513da9f4463f1d4874b548dfbac29d91f34')
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
const { ethereumWallet } = require('./ethereum/wallet')

/* 
note
wallet manager is blockchain agnostic and knows less as possible about platform specifics
glues storage, wallet, and normalized user creds from controllers only
*/

const walletManager = (config, logger, storage) => {
    // note could use amazon kms or so, to keep in memory only and not on disk
    if (!config.passphraseSalt) {
        throw new Error('passphrase salt is not set')
    }

    const generatePassphrase = (userId) => {
        return config.passphraseSalt + userId
    }

    const wallet = ethereumWallet(config, logger)

    const getWallet = async (userId) => {
        // todo
        const w = await storage.getWallet(userId)
        return w
    }

    const getBalance = (userId) => {
        // todo
        return wallet.getBalance('0xa5241513da9f4463f1d4874b548dfbac29d91f34')
    }

    const createWallet = async (userId) => {
        const w = wallet.createWallet()
        const address = w.address
        
        // todo encrypt
        await storage.saveWallet(userId, w)
        return address
    }

    const signPayload = (userId, payload) => {

    }

    const sendTransaction = (userId, amount, payload) => {

    }

    return {
        createWallet,
        signPayload,
        sendTransaction,
        getBalance,
        getWallet
    }
}

module.exports = {
    walletManager
}
const { ethereumWallet } = require('./ethereum/wallet')
const { encrypt, decrypt } = require('../util/encryption')

/* 
note
wallet manager is blockchain agnostic and knows less as possible about platform specifics
glues storage, encryption, wallet, and normalized inputs from api controllers
*/
const walletManager = (config, logger, storage) => {
    // note could use amazon kms or so, to keep in memory only and not on disk
    if (!config.passphraseSalt) {
        throw new Error('passphrase salt is not set')
    }

    const getPassphrase = (userId) => {
        return config.passphraseSalt + userId
    }

    const wallet = ethereumWallet(config, logger)

    const getWallet = async (userId) => {
        const { address } = await storage.getWallet(userId)
        return address
    }

    const getBalance = async (userId) => {
        const { address } = await storage.getWallet(userId)
        const balance = await wallet.getBalance(address)
        return balance
    }

    const createWallet = async (userId) => {
        const savedWallet = getWallet(userId)
        if (savedWallet) {
            return savedWallet
        }
        
        const w = wallet.createWallet()
        const address = w.address
        const passphrase = getPassphrase(userId)
        const { encryptedData, salt } = await encrypt(passphrase, w.privateKey)

        const data = {
            address,
            encryptedData,
            salt
        }
        await storage.saveWallet(userId, data)
        return address
    }

    const signPayload = async (userId, payload) => {
        const w = await storage.getWallet(userId)
        const passphrase = getPassphrase(userId)
        const privateKey = await decrypt(passphrase, w.salt, w.encryptedData)
        const signature = await wallet.sign(privateKey, payload)
        return signature
    }

    const sendTransaction = async (userId, amount, recipient, payload) => {
        const w = await storage.getWallet(userId)
        const passphrase = getPassphrase(userId)
        const privateKey = await decrypt(passphrase, w.salt, w.encryptedData)

        const transactionHash = await wallet.sendTransaction(privateKey, amount, recipient, payload)
        return transactionHash
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
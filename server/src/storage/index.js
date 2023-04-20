const { levelStorage } = require('./level/level')
const ethers = require('ethers')

const generateKey = key => ethers.keccak256(ethers.toUtf8Bytes(key.toString()))

const storageFactory = async (config, logger) => {
    const s = await levelStorage(config, logger)

    const getWallet = async (walletId) => {
        const key = generateKey(walletId)
        return s.get(key)
    }

    const saveWallet = async (walletId, payload) => {
        const key = generateKey(walletId)
        await s.put(key, payload)
    }

    const deleteAll = s.deleteAll

    return {
        getWallet,
        saveWallet,
        deleteAll
    }
}

module.exports = { storageFactory }
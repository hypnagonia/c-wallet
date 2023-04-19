const { levelStorage } = require('./level/level')

const storageFactory = async (config, logger) => {
    const s = await levelStorage(config, logger)

    const getWallet = async (walletId) => {
        return s.get(walletId)
    }

    const saveWallet = async (walletId, payload) => {
        await s.put(walletId, payload)
    }

    return {
        getWallet,
        saveWallet
    }
}

module.exports = { storageFactory }
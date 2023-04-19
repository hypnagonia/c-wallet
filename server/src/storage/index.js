const { levelStorage } = require('./level/level')

const storageFactory = async (config, logger) => {
    const s = await levelStorage(config, logger)

    return s
}

module.exports = { storageFactory }
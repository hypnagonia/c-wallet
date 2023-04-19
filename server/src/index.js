const { getConfig } = require('./config')
const { createLoggerFactory } = require('./logger')
const { server: apiServer } = require('./api/server')
const { walletManager } = require('./wallet/walletManager')

const run = async () => {
    const config = getConfig()
    const logger = createLoggerFactory(config.logger)
    const l = logger(module)

    const storage = 0
    const wallet = walletManager(config.wallet, logger, storage)
    l.info('starting api server')
    const api = await apiServer(config.api, logger, wallet)


}

run()
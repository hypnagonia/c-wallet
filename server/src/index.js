const { getConfig } = require('./config')
const { createLoggerFactory } = require('./logger')
const { server: apiServer } = require('./api/server')

const config = getConfig()
const logger = createLoggerFactory(config.logger)

const l = logger(module)

const run = async () => {
    l.info('starting api server')
    const api = await apiServer(config.api, logger)
}

run()
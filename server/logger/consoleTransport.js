const zerg = require('zerg').default
const { consoleNodeColorful } = require('zerg/dist/transports')
const { config } = require('../config')

function handler(logMessage) {
    const date = new Date().toISOString()
    logMessage.message = `[${date}] ${logMessage.message}`
    return logMessage
}

const consoleTransport = zerg.createListener({
    handler: (...args) => consoleNodeColorful(handler(...args)),
    levels: config.logger.levels,
})

module.exports = { consoleTransport }

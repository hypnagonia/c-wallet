const zerg = require('zerg').default
const { consoleNodeColorful } = require('zerg/dist/transports')

function handler(logMessage) {
    const date = new Date().toISOString()
    logMessage.message = `[${date}] ${logMessage.message}`
    return logMessage
}

const consoleTransport = config => zerg.createListener({
    handler: (...args) => consoleNodeColorful(handler(...args)),
    levels: config.levels,
})

module.exports = { consoleTransport }

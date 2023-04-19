const zerg = require('zerg').default
const { consoleTransport } = require('./consoleTransport')

const loggerFactory = zerg.createLogger()

loggerFactory.addListener(consoleTransport)

const logger = (module, name) => {
    let filename
    try {
        // commonjs
        filename = module.filename.split('src/')[1].split('.')[0]
    } catch (e) {
        // for webpack build
        filename = Object.keys(module.exports)[0] || 'main'
    }

    return loggerFactory.module([filename, name].filter((a) => a).join(':'))
}

module.exports = { logger }

const dotenv = require('dotenv')

dotenv.config()

const passphraseSalt = process.env.PASSPHRASE_SALT

if (!passphraseSalt) {
    throw new Error('PASSPHRASE_SALT env var is not set')
}

const config = {
    wallet: {
        passphraseSalt,
        rpc: {
            url: process.env.RPC_URL
        }
    },
    api: {
        port: process.env.API_PORT,
        auth: {}
    },
    storage: {},
    logger: {
        levels: ['error', 'info', 'warn', 'debug']
    }
}

module.exports = {
    config
}
const dotenv = require('dotenv')

const getConfig = (envPath) => {
    dotenv.config({ path: envPath })

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
            port: +process.env.API_PORT || 3000,
            auth: {}
        },
        storage: {
            location: './db',
            createIfMissing: true
        },
        logger: {
            levels: ['error', 'info', 'warn', 'debug']
        }
    }

    return config
}


module.exports = {
    getConfig
}
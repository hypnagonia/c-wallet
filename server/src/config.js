const dotenv = require('dotenv')

const getConfig = (envPath) => {
    dotenv.config({ path: envPath })

    const config = {
        wallet: {
            passphraseSalt: process.env.PASSPHRASE_SALT,
            rpc: {
                url: process.env.RPC_URL
            },
            gasLimit: 60000,
            gasPrice: 100
        },
        api: {
            port: +process.env.API_PORT || 3001,
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
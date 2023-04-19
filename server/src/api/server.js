const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const { walletRouter } = require('./walletRouter')

// todo
// catch errs
// validate inputs
// auth guard

const server = async (apiConfig, logger, wallet) => {
    const l = logger(module, 'api')
    const api = express()
    api.use(cors())
    api.use(bodyParser.json())
    api.disable('x-powered-by')
    api.use((req, res, next) => {
        l.debug(`${req.method} ${req.path}`)
        next()
    })

    api.use('/api', walletRouter(logger, wallet))

    const close = () => server.close()

    const server = http.createServer(api).listen(apiConfig.port, () => {
        l.info(`API is up at http://localhost:${apiConfig.port}`)
    })


    return close
}

module.exports = {
    server
}
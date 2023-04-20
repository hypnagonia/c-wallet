const { Router } = require('express')
const { catchAsync } = require('./util')

const walletRouter = (logger, wallet) => {
    const walletRouter = Router({ mergeParams: true })

    const getBalance = async (req, res, next) => {
        const userId = req.user
        
        // note it is go-through query, nice to cache for short time
        const balance = await wallet.getBalance(userId)

        res.json({ balance })
    }

    const createWallet = async (req, res, next) => {
        const userId = req.user
        const w = await wallet.createWallet(userId)
        res.json({ wallet: w })
    }

    const signPayload = async (req, res, next) => {
        const userId = req.user
        const { payload } = req.body
        const signature = await wallet.signPayload(userId, payload)

        res.json({ signature })
    }

    const getWallet = async (req, res, next) => {
        const userId = req.user
        const w = await wallet.getWallet(userId)

        res.json({ wallet: w })
    }

    const sendTransaction = async (req, res, next) => {
        const userId = req.user
        const { recipient, amount, payload } = req.body
        const transactionHash = await wallet.sendTransaction(userId, amount, recipient, payload)

        res.json({ transactionHash })
    }

    walletRouter.post('/balance', catchAsync(getBalance))
    walletRouter.post('/create', catchAsync(createWallet))
    walletRouter.post('/sign', catchAsync(signPayload))
    walletRouter.post('/send', catchAsync(sendTransaction))
    walletRouter.post('/', catchAsync(getWallet))

    return walletRouter
}

module.exports = {
    walletRouter
}


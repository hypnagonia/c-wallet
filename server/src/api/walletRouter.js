const { Response, Request, Router, NextFunction } = require('express')

const walletRouter = (logger, wallet) => {
    const walletRouter = Router({ mergeParams: true })

    const getBalance = async (req, res, next) => {
        const { strategyId } = req.params
        const { search } = req.query
        const userId = 'abc'

        // note it is go-through query, nice to cache for short time
        const balance = await wallet.getBalance(userId)

        res.json({ balance })
    }

    const createWallet = async (req, res, next) => {
        const userId = 'abc'
        const w = await wallet.createWallet(userId)

        res.json({ wallet: w })
    }

    const signPayload = async (req, res, next) => {
        const userId = 'abc'
        const payload = 'abc'
        const signature = await wallet.signPayload(userId, payload)

        res.json({ signature })
    }

    const getWallet = async (req, res, next) => {
        const userId = 'abc'
        const w = await wallet.getWallet(userId)

        res.json({ wallet: w })
    }

    const sendTransaction = async (req, res, next) => {
        const userId = 'abc'
        const amount = '1'
        const payload = '0x'
        const to = '0xf3f64384cd47ccdb39392024791d84905e63a94e'
        const transactionHash = await wallet.sendTransaction(userId, amount, to, payload)

        res.json({ transactionHash })
    }

    // todo why dont i make all of them post and not get
    walletRouter.get('/balance', getBalance)
    // todo must be post
    walletRouter.get('/create', createWallet)
    // todo must be post
    walletRouter.get('/sign', signPayload)
    // todo must be post
    walletRouter.get('/send', sendTransaction)
    // to do replace id with auth
    walletRouter.get('/', getWallet)

    return walletRouter
}

module.exports = {
    walletRouter
}


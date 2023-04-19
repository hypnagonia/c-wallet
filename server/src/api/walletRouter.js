const { Response, Request, Router, NextFunction } = require('express')

const walletRouter = (logger, wallet) => {
    const walletRouter = Router({ mergeParams: true })

    const getBalance = async (req, res, next) => {
        const { strategyId } = req.params
        const { search } = req.query

        // note it is go-through query, nice to cache for short time
        const balance = await wallet.getBalance()

        res.json({ balance })
    }

    const createWallet = async (req, res, next) => {
        const userId = 'abc'
        const w = await wallet.createWallet(userId)
        
        res.json({ wallet: w })
    }

    const getWallet = async (req, res, next) => {
        const userId = 'abc'
        const w = await wallet.getWallet(userId)

        res.json({ wallet: w })
    }

    const signPayload = async (req, res, next) => {
    }

    const sendTransaction = async (req, res, next) => {
    }

    // todo why dont i make all of them post and not get
    walletRouter.get('/balance', getBalance)
    // todo must be post
    walletRouter.get('/create', createWallet)
    // to do replace id with auth
    walletRouter.get('/', getWallet)

    return walletRouter
}

module.exports = {
    walletRouter
}


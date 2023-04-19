const { Response, Request, Router, NextFunction } = require('express')

const walletRouter = (logger, wallet) => {
    const walletRouter = Router({ mergeParams: true })

    const getBalance = async (req, res, next) => {
        const { strategyId } = req.params
        const { search } = req.query

        const balance = await wallet.getBalance()

        res.json({ balance })
    }

    const createWallet = async (req, res, next) => {
        const w = wallet.createWallet()

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

    return walletRouter
}

module.exports = {
    walletRouter
}


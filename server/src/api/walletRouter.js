const { Response, Request, Router, NextFunction } = require('express')


const walletRouter = (logger, wallet) => {
    const walletRouter = Router({ mergeParams: true })

    const getBalance = async (req, res, next) => {
        const { strategyId } = req.params
        const { search } = req.query

        const w = wallet.createWallet()

        res.json({ wallet: w })
    }

    const createWallet = async (req, res, next) => {
        const { strategyId } = req.params
        const { search } = req.query

        const w = wallet.createWallet()

        res.json({ wallet: w })
    }


    walletRouter.get('/balance', getBalance)
    walletRouter.get('/create', createWallet)

    return walletRouter
}

module.exports = {
    walletRouter
}


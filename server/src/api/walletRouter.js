const { Response, Request, Router, NextFunction } = require('express')
const walletRouter = Router({ mergeParams: true })

walletRouter.get('/balance', getBalance)


async function getBalance(
    req,
    res,
    next
) {
    const { strategyId } = req.params
    const { search } = req.query

    res.json({ hello: 'hello' })
}

module.exports = {
    walletRouter
}



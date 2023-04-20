const { Router } = require('express')
const ethers = require('ethers')

const internalError = 'Internal Error'
const catchAsync = log => f => {
  return async (req, res, next) => {
    try {
      await f(req, res, next)
    } catch (err) {
      log.error(err)
      next(err ? err.message || err : internalError)
    }
  }
}

// only ethereum chain
const isAddress = address => {
  if (!ethers.isAddress(address)) {
    throw new Error(`ethereum hex address expected, got ${address}`)
  }
}

const isAmount = amount => {
  if (isNaN(+amount)) {
    throw new Error(`amount must be a number, got ${amount}`)
  }
}

const isPayload = payload => {
}

module.exports = {
  catchAsync,
  isPayload,
  isAmount,
  isAddress,
  internalError
}

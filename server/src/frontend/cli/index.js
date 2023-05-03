const { encrypt, decrypt } = require('../../util/encryption')
const { toKeccak256 } = require('../../util/hash')
const { createLoggerFactory } = require('../../logger')
const { getConfig } = require('../../config')
const { encryptCli } = require('./encrypt')
const { ethereumWalletCli } = require('./ethereumWallet')
const { Command } = require('commander')
const { ethereumWallet } = require('../../wallet/ethereum/wallet')
/*
./cli.sh crypto decrypt -h
*/
const run = async () => {
    const config = getConfig()
    const logger = createLoggerFactory(config.logger)
    const l = logger(module)

    const program = new Command()
    program
        .name('CLI')
        .description('wallets, crypto and storage')
        .version('1')

    program.addCommand(encryptCli(logger, encrypt, decrypt, toKeccak256))

    const ew = ethereumWallet(config.wallet, logger)
    program.addCommand(ethereumWalletCli(logger, ew))

    try {
        program.parse(process.argv)
    } catch (e) {
        console.log('e')
        l.error(e)
        process.exit(1)
    }
}

run()
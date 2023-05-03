const { Command } = require('commander')

const ethereumWalletCli = (logger, ethereumWallet) => {
    const l = logger(module)
    const program = new Command('eth-wallet')

    program.command('new')
        .description('Generate new ethereum wallet')
        .action(async () => {
            const wallet = ethereumWallet.createWallet()
            l.info(wallet)

        })

    program.command('sign')
        .description('Sign payload with ethereum wallet')
        .argument('<Private Key>', 'Private Key')
        .argument('<Payload>', 'Payload')
        .action(async (privateKey, payload) => {
            const signature = await ethereumWallet.sign(privateKey, payload)
            l.info({ signature })

        })

    program.command('verify-signature')
        .description('Sign payload with ethereum wallet')
        .argument('<Address>', 'Address')
        .argument('<Payload>', 'Payload')
        .argument('<Signature>', 'Signature')
        .action(async (address, payload, signature) => {
            try {
                const isVerified = await ethereumWallet.verifySignature(address, payload, signature)
                if (isVerified) {
                    l.info('Valid')
                } else {
                    l.error('Invalid')
                }
            } catch (e) {
                l.error(e.message || e)
            }
        })

    return program
}

module.exports = {
    ethereumWalletCli
}
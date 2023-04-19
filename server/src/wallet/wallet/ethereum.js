const ethers = require('ethers')

const ethereumWallet = () => {
    const createWallet = () => {
        const wallet = ethers.Wallet.createRandom()

        console.log('address:', wallet.address)
        console.log('mnemonic:', wallet.mnemonic.phrase)
        console.log('privateKey:', wallet.privateKey)

        // delete as we are never going to use it in the future
        delete wallet.mnemonic

        return wallet
    }

    return {
        createWallet
    }
}

module.exports = {
    ethereumWallet
}
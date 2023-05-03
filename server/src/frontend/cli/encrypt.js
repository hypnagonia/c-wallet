const { Command } = require('commander')

const encryptCli = (logger, encrypt, decrypt) => {
    const l = logger(module)
    const program = new Command('crypto')

    program.command('encrypt')
        .description('Encrypt data')
        .argument('<password>', 'password')
        .argument('<payload>', 'payload')
        //.option('--first', 'display just the first substring')
        //.option('-s, --separator <char>', 'separator character', ',')
        .action(async (password, payload, options) => {
            const encrypted = await encrypt(password, payload)
            l.info(encrypted)

        })

    program.command('decrypt')
        .description('Decrypt data')
        .argument('<password>', 'password')
        .argument('<salt>', 'salt')
        .argument('<payload>', 'payload')
        .argument('<iv>', 'iv')
        .action(async (password, salt, payload, vector, options) => {
            try {
                const decrypted = await decrypt(password, salt, { data: payload, iv: vector })
                l.info(decrypted)
            } catch (e) {
                l.error(e.message)
            }

        })

    return program
}

module.exports = {
    encryptCli
}
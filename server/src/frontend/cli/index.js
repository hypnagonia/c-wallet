const { encrypt, decrypt } = require('../../util/encryption')
const { createLoggerFactory } = require('../../logger')
const { getConfig } = require('../../config')
const { encryptCli } = require('./encrypt')
const { Command } = require('commander')

/*
npm run cli crypto decrypt -- -h
*/
const run = async () => {
    const config = getConfig()
    const logger = createLoggerFactory(config.logger)
    const l = logger(module)
    
    const program = new Command()
    program
        .name('encryption command')
        .description('encrypt and decrypt data using util/encryption')
        .version('1')

    program.addCommand(encryptCli(logger, encrypt, decrypt))


    try {
        program.parse(process.argv)
    } catch (e) {
        console.log('e')
        l.error(e)
    }
}

run()
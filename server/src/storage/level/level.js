const { Level } = require('level')

const levelStorage = async (config, logger) => {
    const db = new Level(config.location, { valueEncoding: 'json' })

    await new Promise((resolve, reject) => {
        db.open(resolve, { createIfMissing: config.createIfMissing })
    })

    if (!db.supports.permanence) {
        throw new Error('Persistent storage is required')
    }

    const get = async (key) => {
        return db.get(key)
    }

    const set = async (key) => {
        return db.put(key, value)
    }

    return {
        get,
        set
    }
}

module.exports = {
    levelStorage
}
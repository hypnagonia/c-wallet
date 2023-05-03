const signPayloadMock = [
    {
        privateKey: '0xac8d032d8d9d0a3b62aebb9a47f85b41caeac99df8912b0948287ec606edb2f4',
        payload: 'abc',
        result: '0x543d63d22815c4d2d515cfe4d44c45f64dea28d07fca33e127769452c9f33902724052333cc3b9f1de1c50d4e121918c41fab870cf1e730d96b7f0749f87814d1c'
    }
]

const encryptionDataMock = [
    {
        passphrase: 'abc',
        payload: 'abc'
    }
]

const hashDataMock = [
    {
        value: '1',
        result: '0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6'
    }
]

module.exports = {
    signPayloadMock,
    encryptionDataMock,
    hashDataMock
}
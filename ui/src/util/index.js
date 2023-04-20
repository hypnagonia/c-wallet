const explorerUrl = process.env.REACT_APP_EXPLORER_URL || 'https://explorer.testnet.harmony.one'
export const getBlockExplorerTransactionLink = hash => `${explorerUrl}/tx/${hash}`

export const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const getWindowParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search)
    const v = urlParams.get(param)
    return v
}
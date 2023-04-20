const explorerUrl = process.env.REACT_APP_EXPLORER_URL || 'https://explorer.testnet.harmony.one'
export const getBlockExplorerTransactionLink = hash => `${explorerUrl}/tx/${hash}`
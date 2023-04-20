const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api'

const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}

export async function getBalance() {
	const res = await fetch(`${backendUrl}/balance`, options).then(r => r.json())

	return res.balance
}

export async function getWallet() {
	const res = await fetch(`${backendUrl}/`, options).then(r => r.json())
	return res.wallet
}

export async function sign(payload) {
	const body = JSON.stringify({ payload })
	const res = await fetch(`${backendUrl}/sign`, { body, ...options }).then(r => r.json())
	return res.signature
}

export async function send(recipient, amount, data) {
	const body = JSON.stringify({ recipient, amount, payload: data })
	const res = await fetch(`${backendUrl}/send`, { body, ...options }).then(r => r.json())
	return res.transactionHash
}

export async function createWallet() {
	const res = await fetch(`${backendUrl}/create`,options).then(r => r.json())
	return res.wallet
}




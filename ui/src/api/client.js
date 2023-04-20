import { backendUrl, getWindowParam } from '../util'

const tokenFromGetParam = getWindowParam('token')
const saveToken = token => localStorage.setItem('token', token)
const getToken = () => localStorage.getItem('token')

if (tokenFromGetParam) {
	saveToken(tokenFromGetParam)
	window.location.href = '/'
}

const apiUrl = backendUrl + '/api'

let token = getToken()
const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	}
}

export const logout = () => {
	saveToken('')
	window.location.href = '/'
}

export const isAuthorized = () => !!token

const processResponse = (r) => {
	if (r.status === 401) {
		logout()
	}
	
	return r.json()
}

export async function getBalance() {
	const res = await fetch(`${apiUrl}/balance`, options).then(processResponse)

	return res.balance
}

export async function getWallet() {
	const res = await fetch(`${apiUrl}/`, options).then(processResponse)
	return res.wallet
}

export async function sign(payload) {
	const body = JSON.stringify({ payload })
	const res = await fetch(`${apiUrl}/sign`, { body, ...options }).then(processResponse)
	return res.signature
}

export async function send(recipient, amount, data) {
	const body = JSON.stringify({ recipient, amount, payload: data })
	const res = await fetch(`${apiUrl}/send`, { body, ...options }).then(processResponse)
	return res.transactionHash
}

export async function createWallet() {
	const res = await fetch(`${apiUrl}/create`, options).then(processResponse)
	return res.wallet
}




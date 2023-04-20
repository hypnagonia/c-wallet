import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Wallet } from './components/Wallet'
import { SendTransaction } from './components/sendTransaction'
import { SignPayload } from './components/signPayload'
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react'

function App() {
  return (
    <div className="App">
      <DynamicContextProvider
        settings={{
          environmentId: '63b3c595-5f33-451f-9391-fa343962c6a3',
        }}>
        <DynamicWidget />
      </DynamicContextProvider>
      <BrowserRouter>

        <header className="App-header">
          <div className="main">
            <Wallet />
            <Routes>
              <Route index path="/send" element={<SendTransaction />} />
              <Route index path="/sign" element={<SignPayload />} />
              <Route index path="/" element={null} />

            </Routes>
          </div>
          <div className="box">
            <span className="small">
              using Harmony testnet RPC,<br /> top up your wallet at&nbsp;
              <a href="https://faucet.pops.one/" target="_blank"> https://faucet.pops.one/</a>
            </span>
          </div>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App

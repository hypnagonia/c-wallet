import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Wallet } from './components/Wallet'
import { SendTransaction } from './components/sendTransaction'
import { SignPayload } from './components/signPayload'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-header">
          <div className="box textcenter title">
            <b>WALLET</b>
          </div>

          <div className="main">
            <Wallet />
            <Routes>
              <Route index path="/send" element={<SendTransaction />} />
              <Route index path="/sign" element={<SignPayload />} />
              <Route index path="/" element={null} />
            </Routes>
          </div>
          <div className="box textcenter">
            <span className="small">
              using Harmony testnet RPC,<br /> top up your wallet at&nbsp;
              <a href="https://faucet.pops.one/" target="_blank"> https://faucet.pops.one/</a>
            </span>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

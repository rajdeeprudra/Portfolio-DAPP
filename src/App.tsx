import React, {  useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=cbb4a0ad-fc59-4a00-9586-5354a4d335eb";

  return (
     <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <Topbar />
                    <Portfolio />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
}

function Topbar() {

  const {publicKey} = useWallet();
  return <div style={{display:"flex", justifyContent:"flex-end"}}>
    {!publicKey && <WalletMultiButton />}
    {publicKey && <WalletDisconnectButton />}
  </div>
}

function Portfolio(){
  const {publicKey} = useWallet();
  const {connection} = useConnection();
  
  const [balance, setBalance] = useState<null | number>(null);
  useEffect(()=>{
    if(publicKey){
      alert("hbi");
    
    connection.getBalance(publicKey)
    .then(b=> setBalance(b));
  }
  },[publicKey])
  return <div>
    
    {publicKey?.toString()}<br/>
    SOL Balance - 
    {balance}
  </div>
}

export default App;

import React, { useState } from 'react';
import { address, abi } from './contract.js';
import { ethers } from 'ethers';
import Modal from './Modal/Modal.js';
import './Modal/Modal.css';


function App() {

  const [walletConnected, setWalletConnected] = useState(false);
  const [accountConnected, setAccountConnected] = useState('Connect');
  const [providerContract, setProviderContract] = useState({})
  const [signerContract, setSignerContract] = useState({})
  const [showModal, setShowModal] = useState(false)
  const extension = '.png';
  const imageBaseURI = 'https://cf-ipfs.com/ipfs/QmVF8EdJ8PxZgP6fRCfBJ6Ebei3s9CP6cstZJg7ahMRxBg/';

  async function ConnectMetaMask() {
    let prov;
    let sign;
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.providers.length > 0) {
        for (let i = 0; i < window.ethereum.providers.length; i++) {
          let p = await window.ethereum.providers[i];
          if (p.isMetaMask) {
            prov = await new ethers.providers.Web3Provider(p);
          }
        }
      }
      const accounts = await prov.send("eth_requestAccounts", []);
      setWalletConnected(true);
      setShowModal(false);
      setAccountConnected(accounts[0]);

      sign = await prov.getSigner();
      setProviderContract(new ethers.Contract(address, abi, prov));
      setSignerContract(new ethers.Contract(address, abi, sign));

    }
    else {
      setWalletConnected(false);
      return (<h2>No Web3 extension is not installed!</h2>);
    }
  }

  async function ConnectCoinbaseWallet() {
    let prov;
    let sign;
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.providers.length > 0) {
        for (let i = 0; i < window.ethereum.providers.length; i++) {
          let p = await window.ethereum.providers[i];
          if (p.isCoinbaseWallet) {
            prov = await new ethers.providers.Web3Provider(p);
          }
        }
      }
      const accounts = await prov.send("eth_requestAccounts", []);
      setWalletConnected(true);
      setShowModal(false);
      setAccountConnected(accounts[0]);

      sign = await prov.getSigner();
      setProviderContract(new ethers.Contract(address, abi, prov));
      setSignerContract(new ethers.Contract(address, abi, sign));

    }
    else {
      setWalletConnected(false);
      return (<h2>No Web3 extension is not installed!</h2>);
    }
  }

  const ModalWalletConnect = () => {
    return (
      <div className='modalWalletConnect'>
        <button onClick={() => setShowModal(true)}>{accountConnected}</button>
        <Modal onClose={() => setShowModal(false)} connectMM={() => { ConnectMetaMask() }} connectCB={() => { ConnectCoinbaseWallet() }} show={[showModal, walletConnected]} />
      </div>
    )

  }

  const GetImageURL = async (prop) => {
    const image = imageBaseURI + prop + extension;
    console.log(image)
  }

  const Mint = async () => {
    const id = await providerContract.totalSupply();
    const tx = await signerContract.mintNFTs(1);
    console.log(tx);
  }

  const ShowImage = async (prop) => {
    const path = "../public/images/" + prop + extension;
    return (
      <div>
        <img src={path} alt="NFT" />
      </div>
    )
  }



  return (
    <>
      <ModalWalletConnect />
      <button onClick={Mint}>Mint</button>
    </>

  )
}
//{/*  */}



export default App;

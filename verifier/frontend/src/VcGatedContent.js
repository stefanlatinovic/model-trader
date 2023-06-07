import { useState, useEffect } from 'react'
import { Button } from "@chakra-ui/react";
import detectEthereumProvider from '@metamask/detect-provider';


function VcGatedContent() {
  const [hasProvider, setHasProvider] = useState(null)
  const [isConnected, setIsConnected] = useState(null)
  const initialState = { accounts: [] }
  const [wallet, setWallet] = useState(initialState)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  require('dotenv').config();
  const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(alchemyKey);

  const contractABI = require('./AIModelNFT.json')
  const contractAddress = "0x79Cffc148432Fb4877245a5BD298f290F4F90ec4";

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, [])

  const updateWallet = async (accounts) => {
    setIsConnected(true)
    setWallet({ accounts })
  }

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    updateWallet(accounts)
  }

  const onMintPressed = async () => {
    const status = await mintNFT(url, name, description);

  };

  const mintNFT = async(url, name, description) => {
    //error handling
    // if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
    //   return {
    //    success: false,
    //    status: "❗Please make sure all fields are completed before minting.",
    //   }
    //  }

     window.contract = await new web3.eth.Contract(contractABI, contractAddress);

     //set up your Ethereum transaction
 const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  'data': window.contract.methods.mint("").encodeABI()//make call to NFT smart contract 
};

//sign the transaction via Metamask
try {
const txHash = await window.ethereum
  .request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
  });
return {
  success: true,
  status: "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
}
} catch (error) {
return {
  success: false,
  status: "Something went wrong: " + error.message
}
}
   }

  return (
    <div style={{ color: "white" }}>
      <h1>👀 Here's the super secret VC gated content!</h1>

      {hasProvider && !isConnected && <Button colorScheme="purple" onClick={handleConnect} margin={4}>
        Connect
      </Button>
      }

      {wallet.accounts.length > 0 &&
        <div>Wallet Accounts: {wallet.accounts[0]}</div>
      }

{hasProvider && isConnected &&
      <div className="Minter">
      <h1 id="title">🧙‍♂️ AI Model NFT Minter</h1>
      {/* <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form> */}
      <Button colorScheme="purple" onClick={onMintPressed} margin={4}>Mint NFT</Button>
    </div>
    }

    </div>
    
  );
}



export default VcGatedContent;

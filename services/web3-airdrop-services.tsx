import { TOKEN_AIRDROP_CONTRACT } from "../contracts-abi/TokenAirdop";
import { TOKEN_CONTRACT } from "../contracts-abi/Token";
import {
  createContractObject,
  createWeb3Object,
  getConnectedWalletAddress,

} from "./web3-services";
import config from "../config";
import { getTokenInfo } from "./web3-token-services";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";

import Web3 from "web3";
var chainId: any;
var publicAddress: any;

if (typeof window !== "undefined" && window.localStorage) {
  publicAddress = localStorage.getItem("walletAddress");

  chainId = localStorage.getItem("netId");
}


let airdropContractAdd:any;
let airdropFee:any;
if (Number(chainId) === Number(11155111)) {
  airdropContractAdd = config.sepolia.airdrop;
  airdropFee = config.sepolia.airdropFee;
} else if (Number(chainId) === Number(5)) {
  airdropContractAdd = config.georli.airdrop;
  airdropFee = config.georli.airdropFee;
} else if (Number(chainId) === Number(80001)) {
  airdropContractAdd = config.mumbai.airdrop;
  airdropFee = config.mumbai.airdropFee;
} else if (Number(chainId) === Number(97)) {
  airdropContractAdd = config.bsc.airdrop;
  airdropFee = config.bsc.airdropFee;
} else if (Number(chainId) === Number(43113)) {
  airdropContractAdd = config.fuji.airdrop;
  airdropFee = config.fuji.airdropFee;
}

export const AirdropERC20Token = async function (
  _tokenAddress:any,
  _toAddress:any,
  _amounts:any
) {
  try {
    const web3Obj = await createWeb3Object();
    const airdropContract = await createContractObject(
      web3Obj,
      TOKEN_AIRDROP_CONTRACT.abi,
      airdropContractAdd
    );
  
    let [decimals, symbol] = await getTokenInfo(_tokenAddress);
    let tempAmounts = [];
    for (let index = 0; index < _amounts.length; index++) {
      let element = _amounts[index];
      element = element * Math.pow(10, decimals);
      tempAmounts.push(element.toString());
    }
    let approve = await airdropContract.methods
      .transferToken(_tokenAddress, _toAddress, tempAmounts)
      .send({ from: publicAddress, value: Web3.utils.toWei(airdropFee) })
      .then(function (receipt:any) {
        return receipt;
      });

    return approve;
  } catch (error) {
    console.log("Error| ERC20 Approve token", error);
    throw new Error("Error while increasing the token allowance.");
  }
};

// export const decreaseERC20Allowance = async function (
//   _tokenAddress,
//   _toAddress,
//   _amount
// ) {
//   try {
//     const web3Obj = await createWeb3Object();
//     const nftContract = await createContractObject(
//       web3Obj,
//       NFT_CONTRACT.abi,
//       _tokenAddress
//     );


//     let [decimals, symbol] = await getTokenInfo(_tokenAddress);
//     _amount = _amount * Math.pow(10, decimals);
//     let revoke = await nftContract.methods
//       .decreaseAllowance(_toAddress, _amount.toString())
//       .send({ from: walletAddress })
//       .then(function (receipt) {
//         return receipt;
//       });

//     return revoke;
//   } catch (error) {
//     console.log("Error| ERC20 Reduce allowance", error);
//     throw new Error("Error while reducing the allwance amount.");
//   }
// };

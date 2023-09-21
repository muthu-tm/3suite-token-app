import { TOKEN_AIRDROP_CONTRACT } from "../contracts-abi/TokenAirdop";
import { TOKEN_CONTRACT } from "../contracts-abi/Token";
import {
  createContractObject,
  createWeb3Object,
  getConnectedWalletAddress,
} from "./web3-services";
import config from "../config";
import { getTokenInfo } from "./web3-token-services";

let airdropContractAdd;
const chainId = localStorage.getItem("netId");
const publicAddress = localStorage.getItem("walletAddress");

if (Number(chainId) === Number(1115511)) {
  airdropContractAdd = config.sepoliafactoryContract;
} else if (Number(chainId) === Number(5)) {
  airdropContractAdd = config.georlifactoryContract;
} else if (Number(chainId) === Number(80001)) {
  airdropContractAdd = config.mumbai.airdrop;
} else if (Number(chainId) === Number(97)) {
  airdropContractAdd = config.bscfactoryContract;
} else if (Number(chainId) === Number(43113)) {
  airdropContractAdd = config.fujiScan;
}

export const AirdropERC20Token = async function (
  _tokenAddress,
  _toAddress,
  _amounts
) {
  try {
    const web3Obj = await createWeb3Object();
    const airdropContract = await createContractObject(
      web3Obj,
      TOKEN_AIRDROP_CONTRACT.abi,
      airdropContractAdd
    );
    let [decimals, symbol] = await getTokenInfo(_tokenAddress);
   let tempAmounts=[];
    for (let index = 0; index < _amounts.length; index++) {
      let element = _amounts[index];
      element = element * Math.pow(10, decimals);
      tempAmounts.push(element.toString())
    }
    let approve = await airdropContract.methods
      .transferToken(_tokenAddress, _toAddress,tempAmounts)
      .send({ from: publicAddress })
      .then(function (receipt) {
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
//     let walletAddress = await getConnectedWalletAddress(
//       web3Obj,
//       localStorage.getItem("wallet_type")
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

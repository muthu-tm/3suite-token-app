import { TOKEN_FACTORY_CONTRACT } from "../contracts-abi/TokenFactory";
import { TOKEN_CONTRACT } from "../contracts-abi/Token";
import { NFT_CONTRACT } from "../contracts-abi/NFTToken";
import {
  createContractObject,
  createWeb3Object,
  getConnectedWalletAddress,
} from "./web3-services";
import config from "../config";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";
var chainId: any;
var publicAddress: any;
let factoryContractAdd: any;



if (typeof window !== "undefined" && window.localStorage) {
  publicAddress = localStorage.getItem("walletAddress");

  chainId = localStorage.getItem("netId");
}

if (Number(chainId) === Number(11155111)) {
  factoryContractAdd = config.sepolia.tokenContract;
} else if (Number(chainId) === Number(5)) {
  factoryContractAdd = config.georli.tokenContract;
} else if (Number(chainId) === Number(80001)) {
  factoryContractAdd = config.mumbai.tokenContract;
} else if (Number(chainId) === Number(97)) {
  factoryContractAdd = config.bsc.tokenContract;
} else if (Number(chainId) === Number(43113)) {
  factoryContractAdd = config.fuji.tokenContract;
}

// usersCount(address)
// userTokens(address, index)

export const getTokenInfo = async function (_tokenAddress: any) {
  const web3Obj = await createWeb3Object();
  const tokenContract = await createContractObject(
    web3Obj,
    TOKEN_CONTRACT.abi,
    _tokenAddress
  );

  let decimals = await tokenContract.methods.decimals().call();
  let symbol = await tokenContract.methods.symbol().call();
  return [decimals, symbol];
};

export const getTokenBalance = async (_tokenAddress: any) => {
  try {
    const web3Obj = await createWeb3Object();

    const tokenContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );

    let result = await tokenContract.methods.balanceOf(publicAddress).call();

    return result;
  } catch (error) {
    console.log("Error in web3-utils | getTokenBalance", error);
    throw new Error("Error whileget token.");
  }
};

export const getTokenContract = async function (_tokenAddress: any) {
  const web3Obj = await createWeb3Object();
  const tokenContract = await createContractObject(
    web3Obj,
    TOKEN_CONTRACT.abi,
    _tokenAddress
  );

  return tokenContract;
};

export const deployToken = async function (
  _name: any,
  _symbol: any,
  _supply: any,
  _decimals: any,
  _isMint: any,
  _isBurn: any,
  _isPause: any
) {
  try {
    const web3Obj = await createWeb3Object();

    const factoryContract = await createContractObject(
      web3Obj,
      TOKEN_FACTORY_CONTRACT.abi,
      factoryContractAdd
    );
    console.log("factoryContractAdd", factoryContractAdd);

    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let deploy = await factoryContract.methods
      .deployToken(
        _name,
        _symbol,
        _supply,
        _decimals,
        _isMint,
        _isBurn,
        _isPause
      )
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return deploy;
  } catch (error) {
    console.log("Error| ERC20 deploy token", error);
    throw new Error("Error while deploying ERC20 token!");
  }
};

export const getUserTokens = async function () {
  try {
    const web3Obj = await createWeb3Object();
    const factoryContract = await createContractObject(
      web3Obj,
      TOKEN_FACTORY_CONTRACT.abi,
      factoryContractAdd
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let tokens = [];
    let allTokens = await factoryContract.methods
      .usersCount(walletAddress)
      .call();

    for (let index = 0; index < allTokens; index++) {
      // const element = array[index];
      let token = await factoryContract.methods.userTokens(
        walletAddress,
        index
      );
      tokens.push(token);
    }

    return tokens;
  } catch (error) {
    console.log("Error| ERC20 Deployed User token", error);
    throw new Error("Error while getting more token!");
  }
};

export const mintToken = async function (
  _tokenAddress: any,
  _toAdd: any,
  _amount: any
) {
  try {
    const web3Obj = await createWeb3Object();
    const tokenContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let mint = await tokenContract.methods
      .mint(_toAdd, _amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return mint;
  } catch (error) {
    console.log("Error| ERC20 mint token", error);
    throw new Error("Error while minting more token!");
  }
};

export const burnToken = async function (_tokenAddress: any, _amount: any) {
  try {
    const web3Obj = await createWeb3Object();
    const tokenContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let burn = await tokenContract.methods
      .burn(_amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return burn;
  } catch (error) {
    console.log("Error| ERC20 burn token", error);
    throw new Error("Error while burning token!");
  }
};

export const pauseToken = async function (_tokenAddress: any) {
  try {
    const web3Obj = await createWeb3Object();
    const tokenContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let pause = await tokenContract.methods
      .pause()
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return pause;
  } catch (error) {
    console.log("Error| ERC20 pause token", error);
    throw new Error("Error while pausing token!");
  }
};

export const unPauseToken = async function (_tokenAddress: any) {
  try {
    const web3Obj = await createWeb3Object();
    const tokenContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let unpause = await tokenContract.methods
      .unpause()
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return unpause;
  } catch (error) {
    console.log("Error| ERC20 unPause token", error);
    throw new Error("Error while unPausing token!");
  }
};

export const increaseERC20Allowance = async function (
  _tokenAddress: any,
  _toAddress: any,
  _amount: any
) {
  try {
    const web3Obj = await createWeb3Object();
    const nftContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let [decimals, symbol] = await getTokenInfo(_tokenAddress);
    _amount = _amount * Math.pow(10, decimals);

    let approve = await nftContract.methods
      .increaseAllowance(_toAddress, _amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return approve;
  } catch (error) {
    console.log("Error| ERC20 Approve token", error);
    throw new Error("Error while increasing the token allowance.");
  }
};

export const decreaseERC20Allowance = async function (
  _tokenAddress: any,
  _toAddress: any,
  _amount: any
) {
  try {
    const web3Obj = await createWeb3Object();
    const nftContract = await createContractObject(
      web3Obj,
      NFT_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let [decimals, symbol] = await getTokenInfo(_tokenAddress);
    _amount = _amount * Math.pow(10, decimals);
    let revoke = await nftContract.methods
      .decreaseAllowance(_toAddress, _amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt: any) {
        return receipt;
      });

    return revoke;
  } catch (error) {
    console.log("Error| ERC20 Reduce allowance", error);
    throw new Error("Error while reducing the allwance amount.");
  }
};

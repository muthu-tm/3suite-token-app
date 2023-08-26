import { TOKEN_FACTORY_CONTRACT } from "../contracts-abi/TokenFactory";
import { TOKEN_CONTRACT } from "../contracts-abi/Token";
import { NFT_CONTRACT } from "../contracts-abi/NFTToken";
import { createContractObject, createWeb3Object, getConnectedWalletAddress } from "./web3-services";
import config from "../config";

const factoryContractAdd = config.factoryContract;

export const getTokenInfo = async function (_tokenAddress) {
  const web3Obj = await createWeb3Object()
  const tokenContract = await createContractObject(
    web3Obj,
    TOKEN_CONTRACT.abi,
    _tokenAddress
  );

  let decimals = await tokenContract.methods.decimals().call();
  let symbol = await tokenContract.methods.symbol().call();
  return [decimals, symbol];
};

export const getTokenContract = async function (_tokenAddress) {
  const web3Obj = await createWeb3Object()
  const tokenContract = await createContractObject(
    web3Obj,
    TOKEN_CONTRACT.abi,
    _tokenAddress
  );

  return tokenContract;
};

export const deployToken = async function (_name, _symbol, _supply, _decimals, _isMint, _isBurn, _isPause) {
  try {
    const web3Obj = await createWeb3Object()
    const factoryContract = await createContractObject(
      web3Obj,
      TOKEN_FACTORY_CONTRACT.abi,
      factoryContractAdd
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let deploy = await factoryContract.methods
      .deployToken(_name, _symbol, _supply, _decimals, _isMint, _isBurn, _isPause)
      .send({ from: walletAddress })
      .then(function (receipt) {
        return receipt;
      });

    return deploy;
  } catch (error) {
    console.log("Error| ERC20 deploy token", error);
    throw new Error("Error while deploying ERC20 token!");
  }
};

export const mintToken = async function (_tokenAddress, _toAdd, _amount) {
  try {
    const web3Obj = await createWeb3Object()
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
      .then(function (receipt) {
        return receipt;
      });

    return mint;
  } catch (error) {
    console.log("Error| ERC20 mint token", error);
    throw new Error("Error while minting more token!");
  }
};

export const burnToken = async function (_tokenAddress, _amount) {
  try {
    const web3Obj = await createWeb3Object()
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
      .then(function (receipt) {
        return receipt;
      });

    return burn;
  } catch (error) {
    console.log("Error| ERC20 burn token", error);
    throw new Error("Error while burning token!");
  }
};

export const pauseToken = async function (_tokenAddress) {
  try {
    const web3Obj = await createWeb3Object()
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
      .then(function (receipt) {
        return receipt;
      });

    return pause;
  } catch (error) {
    console.log("Error| ERC20 pause token", error);
    throw new Error("Error while pausing token!");
  }
};

export const unPauseToken = async function (_tokenAddress) {
  try {
    const web3Obj = await createWeb3Object()
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
      .then(function (receipt) {
        return receipt;
      });

    return unpause;
  } catch (error) {
    console.log("Error| ERC20 unPause token", error);
    throw new Error("Error while unPausing token!");
  }
};

export const increaseERC20Allowance = async function (_tokenAddress, _toAddress, _amount) {
  try {
    const web3Obj = await createWeb3Object()
    const nftContract = await createContractObject(
      web3Obj,
      TOKEN_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let [decimals, symbol] = await getTokenInfo(_tokenAddress)
    _amount = _amount * Math.pow(10, decimals)

    let approve = await nftContract.methods
      .increaseAllowance(_toAddress, _amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt) {
        return receipt;
      });

    return approve;
  } catch (error) {
    console.log("Error| ERC20 Approve token", error);
    throw new Error("Error while increasing the token allowance.");
  }
}

export const decreaseERC20Allowance = async function (_tokenAddress, _toAddress, _amount) {
  try {
    const web3Obj = await createWeb3Object()
    const nftContract = await createContractObject(
      web3Obj,
      NFT_CONTRACT.abi,
      _tokenAddress
    );
    let walletAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );

    let [decimals, symbol] = await getTokenInfo(_tokenAddress)
    _amount = _amount * Math.pow(10, decimals)
    let revoke = await nftContract.methods
      .decreaseAllowance(_toAddress, _amount.toString())
      .send({ from: walletAddress })
      .then(function (receipt) {
        return receipt;
      });

    return revoke;
  } catch (error) {
    console.log("Error| ERC20 Reduce allowance", error);
    throw new Error("Error while reducing the allwance amount.");
  }
}

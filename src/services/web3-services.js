import Web3 from "web3";

export const createWeb3Object = async () => {
  try {
    const web3Obj = new Web3(Web3.givenProvider);

    return web3Obj;
  } catch (error) {
    console.log("Error while creating web3 Object", error);
    throw new Error("Error while creating web3 Object | createWeb3Object");
  }
};

export const getTokenBalance = async (
  web3Obj,
  contractABI,
  contractAddress,
  walletAddress
) => {
  try {
    const contract = new web3Obj.eth.Contract(contractABI, contractAddress);
    let result = await contract.methods.balanceOf(walletAddress).call();
    return result;
  } catch (error) {
    console.log("Error in web3-utils | getTokenBalance", error);
    throw new Error("Error whileget token.");
  }
};

export const createContractObject = async function (
  web3Obj,
  contractABI,
  contractAddress
) {
  try {
    const contractObj = new web3Obj.eth.Contract(contractABI, contractAddress);
    return contractObj;
  } catch (error) {
    console.log("Error in web3-utils | createContractObject", error);
    throw new Error("Error while creating contract object.");
  }
};
export const convertEthToWei = async function (valueInEth) {
  try {
    let valueInWei = [];
    for (let i = 0; i < valueInEth.length; i++) {
      valueInWei.push(Web3.utils.toWei(valueInEth[i]));
    }
    return valueInWei;
  } catch (error) {
    console.log("Error in web3-utils | convertEthToWei", error);
    throw new Error("Error while  converting eth to wei.");
  }
};

export const convertWeiToEth = async function (valueInWei) {
  try {
    let valueInEth = [];
    for (let i = 0; i < valueInWei.length; i++) {
      valueInEth.push(Web3.utils.fromWei(valueInWei[i]));
    }
    return valueInEth;
  } catch (error) {
    console.log("Error in web3-utils | convertWeiToEth", error);
    throw new Error("Error while converting wei to eth.");
  }
};

export const convertToChecksum = async function (address) {
  try {
    return Web3.utils.toChecksumAddress(address);
  } catch (error) {
    console.log("Error in web3-utils | convertToChecksum", error);
    throw new Error("Error while converting address to checksum");
  }
};

export const getConnectedWalletAddress = async (web3Obj, walletType) => {
  try {
    if (walletType === "metamask") {

      return web3Obj.currentProvider.selectedAddress;
    } else if (walletType === "trustwallet") {
      let res = web3Obj.currentProvider.accounts[0];

      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in web3 services | getConnectedWalletAddress ", error);
    throw new Error("Error fetching current wallet address.");
  }
};

export const setApproval = async function (
  web3Obj,
  paxgAbi,
  contractAddress,
  paramObj
) {
  try {

    const contractObj = await createContractObject(
      web3Obj,
      paxgAbi,
      contractAddress
    );
    // check allowance

    let fromAddress = await getConnectedWalletAddress(
      web3Obj,
      localStorage.getItem("wallet_type")
    );
    const existingAllowance = await contractObj.methods
      .allowance(
        fromAddress,
        paramObj.approvalAddress
      )
      .call();

    const existingAllowanceAsBn = Web3.utils.toBN(existingAllowance);

    console.log(existingAllowance);
    if (
      existingAllowanceAsBn.sub(Web3.utils.toBN(paramObj.approvalAmount)) >= 0
    ) {
      return false;
    } else {
      const txReceipt = await contractObj.methods
        .approve(paramObj.approvalAddress, paramObj.approvalAmount)
        .send({ from: fromAddress });
      return txReceipt;
    }
  } catch (error) {
    console.log("Error in paxg-contract-utils | setApproval", error);
    throw new Error("Error while setting approval to paxg contract.");
  }
};

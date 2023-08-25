import Web3 from "web3";

export const switchBlockchain = async function (chainId) {
  try {
    console.log("--", chainId);

    if (typeof window.ethereum === "undefined") return;

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",

      params: [{ chainId: Web3.utils.toHex(chainId) }],
    });
  } catch (error) {
    if (error.code === 4902) {
      if (chainId === Number(5)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Georli Testnet",
              chainId: Web3.utils.toHex(Number(5)),
              nativeCurrency: { name: "Georli", decimals: 18, symbol: "ETH" },
              rpcUrls: [
                "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
              ],
            },
          ],
        });
      } else if (chainId === Number(97)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "BNB Testnet",
              chainId: Web3.utils.toHex(Number(97)),
              nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            },
          ],
        });
      } else if (chainId === Number(80001)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai Testnet",
              chainId: Web3.utils.toHex(Number(80001)),
              nativeCurrency: { name: "Mumbai", decimals: 18, symbol: "MATIC" },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            },
          ],
        });
      } else if (chainId === Number(1115511)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Sepolia Testnet",
              chainId: Web3.utils.toHex(Number(1115511)),
              nativeCurrency: { name: "Sepolia", decimals: 18, symbol: "ETH" },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            },
          ],
        });
      } else if (chainId === Number(43113)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Fuji C Testnet",
              chainId: Web3.utils.toHex(Number(43113)),
              nativeCurrency: { name: "Fuji C ", decimals: 18, symbol: "AVAX" },
              rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            },
          ],
        });
      }else{
        return false
      }
    }
    console.log("Error in wallet-utils | switchBlockchain - ", error);
    throw new Error("Error in switching network. Kindly try again.");
  }
};

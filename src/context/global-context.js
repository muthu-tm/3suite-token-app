import { createContext, useEffect, useState } from "react";

var web3Defaultobj;
export const web3GlobalContext = createContext();

export function Web3Global({ children }) {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress"));
  const [chainGlobal, setChainGlobal] = useState(localStorage.getItem("netId"));
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState({});
  const [existingUser, setExistingUser] = useState();
  const [provider, setProvider] = useState();
  const [web3Obj, setWeb3Obj] = useState();
  const [isAccChange, setIsAccChange] = useState(false);
  const [isAccDisconnect, setIsAccDisconnect] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth_token")
  );
  
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token")
  );

  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (acc) => {
        setWalletAddress(acc[0]);
        setIsAccChange(true);
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      //
      window.ethereum.on("disconnect", () => {
        setWeb3Obj(web3Defaultobj);
        console.log("disconnected");
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("networkChanged", function (networkId) {
        setChainGlobal(networkId);
      });
    }
  }, []);

  return (
    <web3GlobalContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        chainGlobal,
        setChainGlobal,
        provider,
        setProvider,
        web3Obj,
        setWeb3Obj,
        isAccChange,
        setIsAccChange,
        isAccDisconnect,
        setIsAccDisconnect,
        walletType,
        setWalletType,
        authToken,
        setAuthToken,
        refreshToken,
        setRefreshToken,
        userId, setUserId,
        userName, setUserName,
        existingUser, setExistingUser
      }}
    >
      {children}
    </web3GlobalContext.Provider>
  );
}

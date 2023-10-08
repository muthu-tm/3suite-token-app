import { createContext, useEffect, useState } from "react";
var walletConnectedAddress:any;
var web3Defaultobj:any;
var updatedRefreshToken:any;
var authorization:any;
var chainId:any;
var web3Defaultobj;
export const web3GlobalContext = createContext({});

export function Web3Global({ children }:any) {
  const [walletAddress, setWalletAddress] = useState(walletConnectedAddress);
  const [chainGlobal, setChainGlobal] = useState(chainId);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState({});
  const [existingUser, setExistingUser] = useState();
  const [provider, setProvider] = useState();
  const [web3Obj, setWeb3Obj] = useState();
  const [isAccChange, setIsAccChange] = useState(false);
  const [isAccDisconnect, setIsAccDisconnect] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [authToken, setAuthToken] = useState(
    authorization
  );
  
  const [refreshToken, setRefreshToken] = useState(
    updatedRefreshToken
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      walletConnectedAddress = localStorage.getItem("walletAddress");
      authorization = localStorage.getItem("auth_token");
      updatedRefreshToken = localStorage.getItem("refresh_token");
      chainId = localStorage.getItem("netId")
    }
  }, []);


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (acc:any) => {
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
      window.ethereum.on("networkChanged", function (networkId:any) {
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

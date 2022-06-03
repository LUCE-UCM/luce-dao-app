import React, { useEffect, useState } from "react";
import MetaMaskConnectionDialog from "./MetaMaskConnectionDialog";
import MetaMaskInstallationDialog from "./MetaMaskInstallationDialog";
import MetaMaskNetworkDialog from "./MetaMaskNetworkDialog";
import { checkMetaMask, checkNetwork, enableMetaMask } from "../../utils/web3";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

function MetaMaskConector() {
  const srcMetaMaskFoxIcon = "./luce-dao-app/images/metamask-fox-icon.svg";

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [networkName, setNetworkName] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    if (!isMetaMaskConnected) {
      setConnectionErrorMessage(
        "Para poder utilizar la aplicación se requiere una conexión con una cuenta de MetaMask a través de la red de pruebas Rinkeby."
      );
    }
  }, [isMetaMaskConnected]);

  const metamaskConnectionHandler = async () => {
    //User clicked on the "Connect with MetaMask" button.
    //First, check if MetaMask is installed.
    const validWallet = checkMetaMask();
    setIsMetaMaskInstalled(validWallet);
    if (validWallet) {
      //Check if MetaMask is connected using the valid Ethereum network.
      console.log("Checking network...");
      let validNetwork = false;
      const networkId = await checkNetwork();
      if (networkId === "0x4") {
        validNetwork = true;
      }
      if (!validNetwork) {
        let networkName = "";
        //More info: https://docs.metamask.io/guide/ethereum-provider.html#chain-ids
        switch (networkId) {
          case "0x1":
            networkName = "Mainnet";
            break;
          case "0x3":
            networkName = "Ropsten";
            break;
          case "0x5":
            networkName = "Goerli";
            break;
          case "0x2a":
            networkName = "Kovan";
            break;
          default:
            networkName = "Red Ethereum desconocida";
        }
        setNetworkName(networkName);
        setIsValidNetwork(validNetwork);
        console.log("Current network: ", networkName);
      } else {
        const errorCode = await enableMetaMask();
        console.log("Error code: ", errorCode);
        let validConnection = false;
        switch (errorCode) {
          case 0:
            validConnection = true;
            break;
          case -32002:
            setConnectionErrorMessage(
              "RPC Error: Petición de tipo 'wallet_requestPermissions' todavía pendiente para esta aplicación."
            );
            break;
          case 4001:
            setConnectionErrorMessage(
              "No se puede realizar una conexión con MetaMask."
            );
            break;
          default:
            setConnectionErrorMessage(
              "Error desconocido en la conexión con MetaMask."
            );
        }
        setIsMetaMaskConnected(validConnection);
      }
    }
  };

  const metamaskInstallationDialogHandler = () => {
    console.log(
      "App.js - Reload the page in order to test if MetaMask is installed now."
    );
    setReloadPage(true);
  };

  const metamaskNetworkDialogHandler = () => {
    console.log(
      "App.js - Reload the page in order to test if Rinkeby Test Network is selected now."
    );
    setReloadPage(true);
  };

  const metamaskConnectionDialogHandler = () => {
    console.log("Reset the state of the connection.");
    setConnectionErrorMessage("");
  };

  if (reloadPage) {
    return window.location.reload();
  }

  return (
    <>
      <Button
        color="secondary"
        onClick={metamaskConnectionHandler}
        endIcon={<Avatar alt="MetaMask" src={srcMetaMaskFoxIcon}></Avatar>}
        variant="contained"
        disabled={isMetaMaskConnected}
      >
        {isMetaMaskConnected
          ? "Sesión con MetaMask iniciada"
          : "Conectar con MetaMask"}
      </Button>
      {isMetaMaskInstalled ? null : (
        <MetaMaskInstallationDialog
          metamaskDialogHandler={metamaskInstallationDialogHandler}
        />
      )}
      {isValidNetwork ? null : (
        <MetaMaskNetworkDialog
          metamaskNetDialogHandler={metamaskNetworkDialogHandler}
          currentNetwork={networkName}
        />
      )}
      {!!connectionErrorMessage ? (
        <MetaMaskConnectionDialog
          metamaskConnDialogHandler={metamaskConnectionDialogHandler}
          errorMessage={connectionErrorMessage}
        />
      ) : null}
    </>
  );
}

export default MetaMaskConector;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

export default function MetaMaskInstallationDialog(props) {
  const srcMetaMaskFoxIcon = "/images/metamask-fox-icon.svg";

  const [open, setOpen] = useState(true);

  const closeInstallationDialogHandler = () => {
    setOpen(false);
    props.metamaskDialogHandler();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeInstallationDialogHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Instalación de MetaMask
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Por favor, instala la extensión de navegador de MetaMask para poder
            utilizar nuestra aplicación y, a continuación, conéctate a una
            cuenta de MetaMask a través de la red de pruebas de Rinkeby.
            <br />
            <br />
            A continuación, cierra esta ventana para poder recargar la página e
            intentarlo otra vez.
            <br />
            <br />
            Navegadores que funcionan con MetaMask:{" "}
            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              Chrome
            </Link>
            ,{" "}
            <Link
              href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
              target="_blank"
            >
              Firefox
            </Link>
            ,{" "}
            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              Brave
            </Link>
            ,{" "}
            <Link
              href="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US"
              target="_blank"
            >
              Edge
            </Link>
          </DialogContentText>
          <br />
          <Link href="https://metamask.io/download.html" target="_blank">
            <Button
              color="secondary"
              endIcon={
                <Avatar alt="MetaMask" src={srcMetaMaskFoxIcon}></Avatar>
              }
              variant="contained"
            >
              Instalar MetaMask en el Navegador
            </Button>
          </Link>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeInstallationDialogHandler}
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

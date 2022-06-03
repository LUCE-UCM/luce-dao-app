import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

export default function MetaMaskNetworkDialog(props) {
  const [openNetworDialog, setOpenNetworkDialog] = useState(true);

  const networkDialogCloseHandler = () => {
    setOpenNetworkDialog(false);
    props.metamaskNetDialogHandler();
  };

  return (
    <>
      <Dialog
        open={openNetworDialog}
        onClose={networkDialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          MetaMask Network Selection
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cambio a la red de pruebas Rinkeby en MetaMask.
            <br />
            Por favor, cambia la red en tu extensión de MetaMask.
            <br />
            A continuación, cierra esta ventana para que se pueda recargar la
            página y se actualice la información.
            <br />
            <br />
            Actualmente estás utilizando la siguiente red:{" "}
            <strong>{props.currentNetwork}.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={networkDialogCloseHandler} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

export default function MetaMaskConnectionDialog(props) {
  const [openConnectionDialog, setOpenConnectionDialog] = useState(true);

  const connectionDialogCloseHandler = () => {
    setOpenConnectionDialog(false);
    props.metamaskConnDialogHandler();
  };

  return (
    <>
      <Dialog
        open={openConnectionDialog}
        onClose={connectionDialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Conexión con MetaMask"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.errorMessage}
            <br />
            <br />
            Por favor, cierra esta ventana y pulsa en el botón "Conectar con
            MetaMask" para iniciar una sesión.
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={connectionDialogCloseHandler}
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

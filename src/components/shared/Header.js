import React from "react";
import MetaMaskConnector from "../wallet/MetaMaskConnector";
import styles from "../../assets/css/Header.module.css";
import { AppBar, Toolbar, Link, Typography, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const Header = () => {
  const srcLUCELogo = "/images/logo-luce.png";

  return (
    <>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <img
            src={srcLUCELogo}
            alt="LUCE"
            width="70"
            height="70"
            className={styles.logo}
          />
          <Typography className={styles.title} variant="h5" noWrap>
            LUCE
          </Typography>
          <Tooltip title="¿Qué es MetaMask?" arrow>
            <Link
              color="inherit"
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              style={{ marginRight: 5 }}
            >
              <HelpIcon style={{ color: "#565956", fontSize: 25 }} />
            </Link>
          </Tooltip>
          <MetaMaskConnector />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

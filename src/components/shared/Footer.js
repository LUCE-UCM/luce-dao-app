import React from "react";
import styles from "../../assets/css/Footer.module.css";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography"; //import { Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const Footer = () => {
  const srcGitHubImg = "images/github-icon.svg";

  return (
    <>
      <footer className={styles.footer}>
        <Typography variant="body1" className={styles.footerTypo}>
          <LightTooltip title="¿Qué es LUCE?" placement="left">
            <Link
              color="inherit"
              href="https://luce-ucm.github.io/luce-web/"
              target="_blank"
              underline="none"
            >
              LUCE
            </Link>
          </LightTooltip>
          {", "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body2" className={styles.footerTypo}>
          <LightTooltip title="LUCE en GitHub" placement="right-end">
            <Link
              color="inherit"
              href="https://github.com/mcvaliente/luce-dao"
              target="_blank"
            >
              <img src={srcGitHubImg} alt="LUCE en GitHub" />
            </Link>
          </LightTooltip>
        </Typography>
      </footer>
    </>
  );
};

export default Footer;

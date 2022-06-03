import React from "react";
import { Typography, Grid, Link } from "@mui/material";
import styles from "../../assets/css/Error.module.css";

const NotFound = () => {
  const srcNotFoundImg = "/images/404-error-icon.png";
  const srcInfoImg = "/images/info-icon.svg";

  return (
    <div className={styles.error404}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" style={{ color: "#FF3C56" }}>
            <span
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#FF3C56",
              }}
            >
              404
            </span>
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#FF3C56",
              marginTop: "10px",
            }}
          >
            <img
              src={srcInfoImg}
              alt="Page not found"
              className={styles.infoError404}
            />
            <span style={{ verticalAlign: "middle" }}>
              No se localizó la página
            </span>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img alt="error-404" src={srcNotFoundImg}></img>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">
            ¡Lo sentimos! La página que buscas no se encuentra en el servidor.
            Puedes dirigirte a la <Link href="/">página principal </Link> e
            intentarlo de nuevo.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;

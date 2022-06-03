import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";

function Layout(props) {
  return (
    <Container>
      <Header />
      {props.children}
      <Footer />
    </Container>
  );
}

export default Layout;

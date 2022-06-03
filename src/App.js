import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Home from "./components/home/Home";
import NotFound from "./components/error/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Container>
        <Routes>
          {/* Routes (old Switch) decides which component to show based on the current URL.*/}
          <Route path="/" element={<Home />} />
          {/* Redirect user to a specific page if the route does not exist. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

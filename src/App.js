import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./comps/NavBar/NavBar";

export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <NavBar />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

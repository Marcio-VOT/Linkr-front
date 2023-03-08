import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

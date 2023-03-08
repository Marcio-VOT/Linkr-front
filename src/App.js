import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { HomePage } from "./pages/HomePage/HomePage";

export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeline" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

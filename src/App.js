import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import { LikeButton } from "./comps/Like/Like";
import UserPosts from "./pages/UserPosts/UserPosts";




export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <Routes>
      <Route path="/likes" element={<LikeButton />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeline" element={<HomePage />} />
        <Route path="/user/:id" element={<UserPosts />} />
      </Routes>
    </BrowserRouter>
  );
};

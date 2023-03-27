import React from "react";
import GlobalStyleComponent from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import { LikeButton } from "./comps/Like/Like";
import UserPosts from "./pages/UserPosts/UserPosts";
import Hashtag from "./pages/hashtag/index.js";

export default () => {
  return (
    <BrowserRouter>
      <GlobalStyleComponent />
      <Routes>
        <Route path="/likes" element={<LikeButton />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/timeline" element={<HomePage />} />
        <Route path="/user/:id" element={<UserPosts />} />
        <Route path="/hashtag/:hashtag" element={<Hashtag />} />
      </Routes>
    </BrowserRouter>
  );
};

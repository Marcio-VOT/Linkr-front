import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import styled from "styled-components";
import PostForm from "../../comps/PostForm.js";
import PostsContainer from "../../comps/Posts/PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import { LikeButton } from "../../comps/Like/Like.js";
import { SearchInput } from "../../comps/SearchInput/SearchInput.jsx";

export default function HomePage() {
  const [updatePost, setUpdatePost] = useState(false)
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function validateToken() {
      try {
        const token = localStorage.getItem("token");
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }

    validateToken();
  }, []);

  return (
    <>
      {window.innerWidth <= 600 && (
        <SearchContainer>
          <SearchInput search={search} setSearch={setSearch} />
        </SearchContainer>
      )}
      <HomePageContainer>
        <NavBar />
        <TimeLineContent>
          <h1>timeline</h1>
          <LikeButton />
          <PostForm updatePost={updatePost} setUpdatePost={setUpdatePost}/>
          <PostsContainer updatePost={updatePost}/>
        </TimeLineContent>
      </HomePageContainer>
    </>
  );
}

const HomePageContainer = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  background-color: #333333;

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;
const SearchContainer = styled.div`
  width: 100%;
  padding-top: 82px;
  background-color: #333333;
  position: relative;
  z-index: 0;
  button:focus,
  textarea:focus,
  input:focus {
    outline: none;
  }
  input {
    position: absolute;
    z-index: 1;
  }
`;

const TimeLineContent = styled.div`
  margin-top: ${window.innerWidth <= 600 ? "50px" : "120px"};
  width: 50%;
`;

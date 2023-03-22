import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import { validToken } from "../../services/apiAuth.js";
import {
  TimeLineContent,
  HomePageContainer,
  SearchContainer,
  Container
} from "./StyledUserPosts.js";
import { searchUserData, searchUserPosts } from "../../services/search.js";
import { SearchInput } from "../../comps/SearchInput/SearchInput.jsx";
import PostsContainer from "../../comps/Posts/PostsContainer.js";
import UserPostList from "../../comps/UserPostsList/UserPostsList.jsx";

export default function UserPosts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  let { id } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function validateToken() {
      try {
        const token = localStorage.getItem("token");
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }
    async function getUserPosts() {
      try {
        const { data } = await searchUserPosts(id);
        data[0] ? setPosts(data) : setPosts([]);
        console.log(data);
      } catch (error) {
        alert(error.response.data);
      }
    }
    async function getUserData() {
      try {
        const { data } = await searchUserData(id);
        setName(data[0].name);
        setImg(data[0].picture);
      } catch (error) {
        alert(error.response.data);
      }
    }

    validateToken();
    getUserData();
    getUserPosts();
  }, [useParams().id]);

  return (
    <>
      <NavBar />
        <SearchContainer>
          <SearchInput search={search} setSearch={setSearch} />
        </SearchContainer>
      <HomePageContainer>
        <Container>
          <img src={img} alt="profile picture" />
          <h1>{name ? `${name}'s posts` : "timeline"}</h1>
        </Container>
        <TimeLineContent>

          {posts ? (
            <UserPostList posts={posts} name={name} img={img} />
          ) : (
            <UserPostList posts={posts} name={name} img={img} />
          )}
        </TimeLineContent>
      </HomePageContainer>
    </>
  );
}

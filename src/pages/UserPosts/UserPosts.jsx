import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import { validToken } from "../../services/apiAuth.js";
import { TimeLineContent, HomePageContainer } from "./StyledUserPosts.js";
import { searchUserPosts } from "../../services/search.js";

export default function UserPosts() {
  const navigate = useNavigate();
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
        console.log(id);
        const { data } = await searchUserPosts(id);
        data[0] && setPosts((data) => data);
      } catch (error) {
        alert(error.response.data);
      }
    }

    validateToken();
    getUserPosts();
  }, []);

  return (
    <HomePageContainer>
      <NavBar />
      <TimeLineContent>
        <h1>timeline</h1>
        <h1>there are no posts yet</h1>
      </TimeLineContent>
    </HomePageContainer>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import axios from "axios";
import styled from "styled-components";
import PostsContainer from "../../comps/Posts/PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import { LikeButton } from "../../comps/Like/Like.js";
import Trendings from "../../comps/Hashtags/index.js";

export default function Hashtag() {
  const {hashtag} = useParams()
  const [updatePost, setUpdatePost] = useState(false)
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function validateToken() {
      try {
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }

    validateToken();
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const BASE_URL = process.env.REACT_APP_API_URL
    const URL = `${BASE_URL}/posts`
    const promise = axios.get(URL, config);

        promise.then((res) => {
            console.log(res.data)
            const { data } = res;
            setHashtagsList([...data.hashtags])
        });

        promise.catch((err) => {
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, []);

    function buildTrendings() {
      if (hashtagsList.length > 0) {
        return hashtagsList.map((hashtag) => {
          return (
            <Trendings
              key={hashtag.id}
              hashtag = {hashtag.hashtag}
            />
          );
        });
      } else {
        return <p>there are no trendings yet!</p>;
      }
    }


  return (
    <>
      <HomePageContainer>
        <NavBar />
        <TimeLineContent>
          <h1># {hashtag}</h1>
          <span>
          <PostsContainer updatePost={updatePost}/>
          <TrendingsContainer>
            <Title>
              <h1>trending</h1>
            </Title>
            <Container>
              <div>
                {buildTrendings()}
              </div>
            </Container>
          </TrendingsContainer>
          </span>
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

const TimeLineContent = styled.div`
  margin-top: ${window.innerWidth <= 600 ? "50px" : "120px"};
  width: 50%;
  span {
    display: flex;
    gap: 10px;
  }

`;

const TrendingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 160px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  height : 61px;
  width: 301px;
  background-color: #171717;
  border-start-start-radius: 25px;
  border-start-end-radius: 25px;
  border-bottom: solid 1px #484848;
  h1 {
    margin-left:16px;
  }
`

const Container = styled.div`
  background-color: #171717;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;

  
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }
`

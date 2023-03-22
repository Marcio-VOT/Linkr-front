import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import axios from "axios";
import styled from "styled-components";
import PostsContainer from "./PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import Trendings from "../../comps/Hashtags/index.js";

export default function Hashtag() {
  const { hashtag } = useParams()
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
    const URL = `${BASE_URL}/trendding`
    const promise = axios.get(URL, config);

    promise.then((res) => {
      const { data } = res;
      setHashtagsList([...data])
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
            updatePost={updatePost}
            setUpdatePost={setUpdatePost}
            key={hashtag.id}
            hashtag={hashtag.hashtag}
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
          <ContainerTimeLineContent>
            <PostsContainer hashtag={hashtag} updatePost={updatePost} />
            <TrendingsContainer>
              <Title>
                <h1>trending</h1>
              </Title>
              <Container>
                  {buildTrendings()}
              </Container>
            </TrendingsContainer>
          </ContainerTimeLineContent>
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
    @media (max-width: 600px){
      margin-bottom: 19px;
      margin-top: 27px;
      padding-left: 16px;
    }
  }
`;


const TimeLineContent = styled.div`
  margin-top: ${window.innerWidth <= 600 ? "50px" : "120px"};
`;

const ContainerTimeLineContent = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  @media(max-width: 600px){
    flex-direction: column;
    gap: 25px;
  }
`

const TrendingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 301px;
  @media (max-width: 600px){
    max-width: none;
    width: 100%;
  }
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
    padding-left:16px;
  }
  @media (max-width: 600px){
    width: 100%;
    border-radius: 0;
  }
`

const Container = styled.div`
  background-color: #171717;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;
  padding: 10px;
  @media(max-width: 600px){
    width: 100%;
    border-radius: 0;
  }
`

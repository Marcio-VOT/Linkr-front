import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import styled from "styled-components";
import PostsContainer from "./PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import Trendings from "../../comps/Hashtags/index.js";
import searchService from "../../services/search.js";

export default function Hashtag() {
  const { hashtag } = useParams();
  const [updatePost, setUpdatePost] = useState(false);
  const navigate = useNavigate();
  const [hashtagsList, setHashtagsList] = useState([]);
  const token = localStorage.getItem("token");
  const offsetUpdater = 4;
  const date = new Date().toISOString();
  let offset = 0;
  let boole = true;
  const [postsList, setPostsList] = useState([]);
  const {postsFromHashtagId, trandingHashtags } = searchService()

  useEffect(() => {
    async function validateToken() {
      try {
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }

    validateToken();
    setPostsList([])
    trandingHashtags()
      .then((res) => {
        const { data } = res;
        setHashtagsList([...data]);
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
      loadPosts();
    const element = ref.current;
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [updatePost]);

  function buildTrendings() {
    if (hashtagsList.length > 0) {
      return hashtagsList.map((hashtag) => {
        return (
          <Trendings
            updatePost={updatePost}
            setUpdatePost={setUpdatePost}
            key={hashtag.hashtags}
            hashtag={hashtag.hashtags}
          />
        );
      });
    } else {
      return <p>there are no trendings yet!</p>;
    }
  }

  function loadPosts() {
    if (boole) {
      postsFromHashtagId({ hashtag, date, offset })
        .then((res) => {
          const { data } = res;
          setPostsList((postsList) => [...postsList, ...data]);
          if (data.length < offsetUpdater) {
            boole = !boole;
          }
        })
        .catch((err) => {
          alert(
            "An error occured while trying to fetch the posts, please refresh the page"
          );
        });

      offset += 4;
    }
  }

  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight);

    if (currentHeight + 1 >= scrollHeight) {
      loadPosts();
    }
  };

  const ref = useRef(null);

  return (
    <>
      <NavBar />
      <HomePageContainer ref={ref}>
        <TimeLineContent>
          <h1># {hashtag}</h1>
          <ContainerTimeLineContent>
            <PostsContainer postsList={postsList} />
            <TrendingsContainer>
              <Title>
                <h1>trending</h1>
              </Title>
              <Container>{buildTrendings()}</Container>
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
  height: 100vh;
  display: flex;
  background-color: #333333;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    @media (max-width: 600px) {
      margin-bottom: 19px;
      margin-top: 27px;
      padding-left: 16px;
    }
  }
`;

const TimeLineContent = styled.div`
  margin-top: 120px;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

const ContainerTimeLineContent = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 25px;
  }
`;

const TrendingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 301px;
  @media (max-width: 600px) {
    max-width: none;
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 61px;
  width: 301px;
  background-color: #171717;
  border-start-start-radius: 25px;
  border-start-end-radius: 25px;
  border-bottom: solid 1px #484848;
  h1 {
    padding-left: 16px;
  }
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Container = styled.div`
  background-color: #171717;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;
  padding: 10px;
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
  }
`;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import axios from "axios";
import styled from "styled-components";
import PostForm from "../../comps/PostForm.js";
import PostsContainer from "../../comps/Posts/PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import Trendings from "../../comps/Hashtags/index.js";
import { searchPosts } from "../../services/search.js";
import { UpdateButton } from "../../comps/UpdateButton/UpdateButton.jsx";
import searchService from "../../services/search.js";

export default function HomePage() {
  const [updatePost, setUpdatePost] = useState(false);
  const navigate = useNavigate();
  const [hashtagsList, setHashtagsList] = useState([]);
  const token = localStorage.getItem("token");
  const [updatePostList, setUpdatePostList] = useState(true);
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchPosts, trandingHashtags } = searchService();
  let date = new Date().toISOString();
  let offset = 0;
  let boole = false;
  let firstLoad = true;
  const offsetUpdater = 10;

  useEffect(() => {
    async function validateToken() {
      try {
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }
    validateToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const BASE_URL = process.env.REACT_APP_API_URL;
    const URL = `${BASE_URL}/trendding`;

    const promise = axios.get(URL, config);

    promise.then((res) => {
      const { data } = res;
      setHashtagsList([...data]);
    });

    promise.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });

    setPostsList([]);
    firstLoad = false;
    date = new Date().toISOString();
    offset = 0;
    loadPosts(true);
    if (!firstLoad) loadPosts();
    else firstLoad = !firstLoad;
    const element = ref.current;
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [updatePost]);

  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight);

    if (currentHeight + 1 >= scrollHeight && updatePostList != undefined) {
      loadPosts(false);
    }
  };

  function loadPosts(force) {
    if (boole || force) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);

      searchPosts({ date, offset, config })
        .then((res) => {
          const { data } = res;
          setPostsList((postsList) => [...postsList, ...data.posts]);
          console.log(data);
          if (data.posts.length < offsetUpdater || force) {
            boole = !boole;
          }
          setLoading(false);
        })
        .catch(() => {
          alert(
            "An error occured while trying to fetch the posts, please refresh the page"
          );
        });

      offset += 10;
    }
  }
  function buildTrendings() {
    if (hashtagsList.length > 0) {
      return hashtagsList.map((hashtag) => {
        return <Trendings key={hashtag.hashtags} hashtag={hashtag.hashtags} />;
      });
    } else {
      return <p>there are no trendings yet!</p>;
    }
  }

  const ref = useRef(null);

  return (
    <>
      <NavBar />
      <HomePageContainer ref={ref}>
        <TimeLineContent>
          <Feed>
            <h1>timeline</h1>
            <PostForm updatePost={updatePost} setUpdatePost={setUpdatePost} />
            <UpdateButton
              setUpdate={setUpdatePost}
              update={updatePost}
              date={date}
              config={{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }}
            />
            <PostsContainer
              postsList={postsList}
              updatePost={updatePost}
              setUpdatePost={setUpdatePost}
              setUpdatePostList={setUpdatePostList}
              updatePostList={updatePostList}
              loading={loading}
              setPostsList={setPostsList}
            />
          </Feed>
          <TrendingsContainer data-test="trending">
            <Title>
              <h1>trending</h1>
            </Title>
            <Container>{buildTrendings()}</Container>
          </TrendingsContainer>
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
`;

const TimeLineContent = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 120px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 0;
  }
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-bottom: 43px;
    @media (max-width: 600px) {
      margin-bottom: 19px;
      margin-top: 49px;
      padding-left: 17px;
    }
  }
`;

const TrendingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 61px;
  width: 301px;
  background-color: #171717;
  border-start-start-radius: 25px;
  border-start-end-radius: 25px;
  border-bottom: solid 1px #484848;
  margin-top: 103px;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
  }
`;

const Container = styled.div`
  background-color: #171717;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;
  padding: 10px;
`;

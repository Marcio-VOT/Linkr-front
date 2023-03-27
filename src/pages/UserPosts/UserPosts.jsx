import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import { validToken } from "../../services/apiAuth.js";
import {
  TimeLineContent,
  HomePageContainer,
  Container,
  ContainerHeader,
} from "./StyledUserPosts.js";
import searchService from "../../services/search.js";
import UserPostList from "../../comps/UserPostsList/UserPostsList.jsx";
import FollowButton from "../../comps/FollowButton/FollowButton.js";

export default function UserPosts() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const followerId = localStorage.getItem("userid");
  let { id } = useParams();
  const offsetUpdater = 4;
  const date = new Date().toISOString();
  let offset = 0;
  let boole = true;
  const {searchUserData, searchUserPosts} = searchService()

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
    loadPosts();

    const element = ref.current;
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [useParams().id]);

  function loadPosts() {
    if (boole) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      searchUserPosts({ id, date, offset, config })
        .then((res) => {
          const { data } = res;
          setPosts((posts) => [...posts, ...data]);
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
        <Container>
          <ContainerHeader>
            <img src={img} alt="profile picture" />
            <h1>{name ? `${name}'s posts` : "timeline"}</h1>
          </ContainerHeader>
          {followerId === id ? "" : <FollowButton />}
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

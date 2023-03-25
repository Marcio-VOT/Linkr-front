import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./Post";
import styled from "styled-components";
import { searchPosts } from "../../services/search";

export default function PostsContainer({
  updatePost,
  setUpdatePostList,
  updatePostList,
}) {
  const token = localStorage.getItem("token");
  const [postsList, setPostsList] = useState([]);
  const [date, setDate] = useState(new Date().toISOString());
  const [offset, setOffset] = useState(0);
  const offsetUpdater = 4;
  let [boole, setBoole] = useState(true);

  useEffect(() => {
    setBoole(true);
    setPostsList([]);
    setDate(new Date().toISOString());
    setOffset((offset) => 0);
    loadPosts();
  }, [updatePost]);

  useEffect(() => {
    loadPosts();
  }, [updatePostList]);

  function loadPosts() {
    if (boole) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      searchPosts({ date, offset, config })
        .then((res) => {
          const { data } = res;
          setPostsList((postsList) => [...postsList, ...data.posts]);
          if (data.posts.length < offsetUpdater) {
            setBoole(false);
          }
        })
        .catch(() => {
          alert(
            "An error occured while trying to fetch the posts, please refresh the page"
          );
        });

      setOffset(offset + offsetUpdater);
    }
  }

  return (
    <PostsList>
      {postsList.length > 0 ? (
        postsList.map(
          ({
            id,
            description,
            external_link,
            name,
            profile_picture,
            user_id,
          }) => {
            return (
              <Post
                key={id}
                id={id}
                description={description}
                external_link={external_link}
                name={name}
                profile_picture={profile_picture}
                user_id={user_id}
              />
            );
          }
        )
      ) : (
        <p>there are no posts yet!</p>
      )}
    </PostsList>
  );
}

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

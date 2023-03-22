import React, { useState, useEffect } from "react";
import Post from "../Posts/Post";
import styled from "styled-components";

export default function UserPostList({ posts, name, img }) {

  function buildPostsList() {
    if (posts.length > 0) {
      return posts.map(({ id, user_id, description, external_link }) => {
        return (
          <Post
            key={id}
            id={id}
            user_id={user_id}
            description={description}
            external_link={external_link}
            name={name}
            profile_picture={img}
          />
        );
      });
    } else {
      return <p>there are no posts yet!</p>;
    }
  }

  return <PostsList>{buildPostsList()}</PostsList>;
}

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

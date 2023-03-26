import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./Post";
import styled from "styled-components";
import { searchPosts } from "../../services/search";

export default function PostsContainer({ postsList }) {
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

import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import Repost from "./Repost";
import styled from "styled-components";

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
            is_repost,
            published_by
          }) => {
            if(is_repost){
            return (
              <Repost 
                key={id}
                id={id}
                description={description}
                external_link={external_link}
                name={name}
                profile_picture={profile_picture}
                user_id={user_id}
                published_by={ published_by}
                />)}
            else return (
              <Post
                key={id}
                id={id}
                description={description}
                external_link={external_link}
                name={name}
                profile_picture={profile_picture}
                user_id={user_id}
            />)
          })) : (
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

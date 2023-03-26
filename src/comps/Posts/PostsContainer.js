import React from "react";
import Post from "./Post";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

export default function PostsContainer({ postsList, loading }) {
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
      ) : loading ? (
        <div className="message-container">
          <TailSpin
            height="80"
            width="80"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="message-container">
          <p>there are no posts yet!</p>
        </div>
      )}
    </PostsList>
  );
}

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .message-container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    color: white;
  }
`;

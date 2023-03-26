import React, { useEffect, useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import followService from "../../services/followService";

export default function PostsContainer({ postsList, loading }) {
  const {quantityFollowing} = followService()
  const [following, setFollowing] = useState(false)
  
  useEffect(() => {
    async function getQuantityFollowing(){
      const result = await quantityFollowing()
      console.log(result)
      if(Number(result.data.quantityfollowing) > 0){
        setFollowing(true)
      }
    }
    getQuantityFollowing()
    
  }, [])

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
          {following ? <p>No posts found for your friends.</p> : <p>you don't follow anyone yet! Search for new friends</p>}
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

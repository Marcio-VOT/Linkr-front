import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import styled from "styled-components";

export default function PostsContainer({updatePost}){
    const token = localStorage.getItem("token");
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const URL = `${process.env.REACT_APP_API_URL}/posts`
        const promise = axios.get(URL, config);

        promise.then((res) => {
            const { data } = res;
            setPostsList([...data.posts]);
        });

        promise.catch((err) => {
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, [updatePost]);

    function buildPostsList(){
        if(postsList.length > 0){
            return postsList.map(post => {
                const { id, description, external_link, name, profile_picture,  user_id} = post;
                return <Post 
                            key={id} 
                            id={id} 
                            description={description} 
                            external_link={external_link} 
                            name={name}
                            profile_picture={profile_picture}
                            user_id={user_id} />
            })
        } else {
            return <p>there are no posts yet!</p>
        }
    }

    return(
        <PostsList>
            {buildPostsList()}
        </PostsList>
    )
}

const PostsList=styled.div`
    display: flex;
    flex-direction: column;
`
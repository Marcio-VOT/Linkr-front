import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import styled from "styled-components";

export default function PostsContainer(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3ODMzODU1OCwiZXhwIjoxNjc4MzQ5MzU4fQ.WDrR_ZWVMCVzoueJwFprrpPg12YTfnmtrIuVMmsuZmI";
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const URL = "http://localhost:5000/posts"
        const promise = axios.get(URL, config);

        promise.then((res) => {
            const { data } = res;
            setPostsList([...data]);
        });

        promise.catch((err) => {
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, [postsList]);

    function buildPostsList(){
        if(postsList.length > 0){
            return postsList.map(post => {
                const { id, description, external_link, name, profile_picture } = post;
                return <Post 
                            key={id} 
                            id={id} 
                            description={description} 
                            external_link={external_link} 
                            name={name}
                            profile_picture={profile_picture}/>
            })
        } else {
            return <p>there are no posts yet!</p>
        }
    }

    return(
        <PostsList>
            ${buildPostsList()}
        </PostsList>
    )
}

const PostsList=styled.div`
    display: flex;
    flex-direction: column;
`

import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import styled, { StyledComponent } from "styled-components";
import PostForm from "../../comps/PostForm.js";
import PostsContainer from "../../comps/Posts/PostsContainer.js";

export default function HomePage(){
    return(
        <HomePageContainer>
            <NavBar />
            <TimeLineContent>
                <h1>timeline</h1>
                <PostForm />
                <PostsContainer />
            </TimeLineContent>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #333333;

    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`

const TimeLineContent = styled.div`
    margin-top: 120px;
    width: 50%;
`

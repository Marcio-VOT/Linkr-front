import axios from 'axios';
import { useEffect, useState } from "react";
import styled from 'styled-components';



export default function LinkPreview({url}){

    const [metadata, setMetadata] = useState()

    async function getMetadata(){
        try {
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/metadata`, {url})
            setMetadata(result.data)
            console.log(result)
        } catch (error) {
        console.log(error)   
        }
    }

    useEffect(() => {
        getMetadata()
    }, [])
    if(!metadata){
        return(
            <div>
                loading
            </div>
        )
    }
    return(
        <LinkDirect href={url} target='_blank' data-test="link">
        <ContainerLinkData>
            <LinkData>
            <h2>{metadata.meta.title}</h2>
            <p>{metadata.meta.description}</p>
            <p>{metadata.og.url}</p>
            </LinkData>
            <ImageArea url={metadata.og.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1BFq0h-RvrEBWCMPudD2QMYcG2BDJVDYNw&usqp=CAU"}></ImageArea>
        </ContainerLinkData>
        </LinkDirect>
    )
}

const ContainerLinkData = styled.div`
    width: 100%;
    display: flex;
    height: 155px;
    border-radius: 11px;
    max-width: 550px;
    background-color: #171717;
`
const LinkDirect = styled.a`
    text-decoration: none;
`

const ImageArea = styled.div`
    height: 100%;
    width: 30%;
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ffffff;
`

const LinkData = styled.div`
    display: flex;
    width: 70%;
    height: 100%;
    flex-direction: column;
    padding: 20px;
    border-top: 1px solid #4D4D4D;
    border-bottom: 1px solid #4D4D4D;
    border-left: 1px solid #4D4D4D;
    border-bottom-left-radius: 11px;
    border-top-left-radius: 11px;
    @media (max-width: 600px){
        padding: 4px;
    }
    p {
        text-overflow: ellipsis;
        color: #9B9595;
        font-size: 11px;
        font-family: "Lato", sans-serif;
    }

    p:last-child {
        margin-top: 13px;
        @media (max-width: 600px) {
            margin-top: 4px;
        }
    }

    h2 {
        color: #CECECE;
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 5px;
        font-family: "Lato", sans-serif;
    }
`
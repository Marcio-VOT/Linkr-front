import { useEffect } from "react";
import styled from "styled-components";
export default function Post(props){
    const { description, external_link, name, profile_picture } = props;
    return (
    <div data-test="post">
        <CustomerData>
            <img src={profile_picture}/>
            <p>{name}</p>
        </CustomerData>
        <p>{description}</p>
        <a href={external_link} target="_blank">aqui vai o link</a>
    </div>
    )
}

const CustomerData = styled.div`
    display: flex;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;

        color: #707070;
    }
`
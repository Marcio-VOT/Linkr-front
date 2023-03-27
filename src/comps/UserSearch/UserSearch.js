import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import followService from "../../services/followService";

export default function UserSearch({id, profile_picture, name, setSearch, setUserList}) {
    const [follow, setFollow] = useState(false)
    const {verifyFollow} = followService()

    useEffect(() => {
        async function following(){
            const result = await verifyFollow({userId: id})
            console.log(id)
            if(result.data.length > 0){
                setFollow(true)
            }
        }
        following()
    })

    return (
        <UserSearchContainer data-test="user-search">
        <Link to={`/user/${id}`} key={id} >
            <div
                onClick={() => {
                    setSearch("");
                    setUserList([]);
                }}
            >
                <img src={profile_picture} alt={name} />
                <h1>{name}</h1>
            </div>
            {follow ? <ContainerFollowing><span>• following</span></ContainerFollowing> : ""}
        </Link>
        </UserSearchContainer>
    )
}


const ContainerFollowing = styled.div`
    color: #C5C5C5;
    font-size: 19px;
    font-family: "Lato";
`

const UserSearchContainer = styled.div`
    a {
    text-decoration: none;
    display: flex;
    align-items: center;
    }
    
    div {
    display: flex;
    align-items: center;
    padding-left: 17px;
    margin-bottom: 17px;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background-color: #333333;
    }
    h1 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #515151;
      margin-left: 12px;
    }
  }
`
import { useEffect, useState } from "react";
import styled from "styled-components"
import followService from "../../services/followService";

export default function Comment(props){
    const {userId, name, profile_picture, comment} = props;
    const {verifyFollow} = followService()
    const [following, setFollowing] = useState(false)

    useEffect(() => {
     async function getFollowing(){
        const result = await verifyFollow({userId})
        if(result.data.length > 0){
            setFollowing(true)
        }
     }
     getFollowing()
    })

    return(
        <CommentContainer>
            <div className="comment" data-test="comment">
                <img src={profile_picture} />
                <div className="comment-data">
                    <p className="user-name">{name} {following && <span> • following</span>}</p>
                    <p className="user-comment">{comment}</p>
                </div>
            </div>
        </CommentContainer>
    )
}

const CommentContainer=styled.div`
    .comment{
        display: flex;
        border-bottom: 1px solid #353535;
        padding: 19px 0px 19px 0px;

        img{
            height: 39px;
            width: 39px;
            border-radius: 50%;
            margin-right: 18px;
        }

        .comment-data{
            .user-name{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                color: #F3F3F3;
            }
            span {
                color: #565656;
                font-family: Lato;
                font-size: 14px;
            }

            .user-comment{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #ACACAC;
            }
        }
    }
`

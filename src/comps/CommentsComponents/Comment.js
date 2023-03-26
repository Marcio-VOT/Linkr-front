import styled from "styled-components"
import { verifyFollow } from "../../services/followService";

export default function Comment(props){
    const {userId, name, profile_picture, comment} = props;
    return(
        <CommentContainer>
            <div className="comment" data-test="comment">
                <img src={profile_picture} />
                <div className="comment-data">
                    <p className="user-name">{name} {verifyFollow(userId)}</p>
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

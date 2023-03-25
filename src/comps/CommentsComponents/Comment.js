import styled from "styled-components"

export default function Comment(){
    return(
        <CommentContainer>
            <div className="comment" data-test="comment">
                <img src="#" />
                <div>
                    <p>User name</p>
                    <p>the comment of the user.</p>
                </div>
            </div>
        </CommentContainer>
    )
}

const CommentContainer=styled.div`
    .comment{
        display: flex;
    }
`

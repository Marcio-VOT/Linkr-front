import styled from "styled-components";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

export default function CommentContainer(props){
    const { postId } = props;

    return (
        <CommentsList>
            <div data-test="comment-box">
                <Comment />
                <CommentInput postId={postId} />
            </div>      
        </CommentsList>
    );
}

const CommentsList= styled.div`
    background-color: #1E1E1E;
    padding: 25px;
`
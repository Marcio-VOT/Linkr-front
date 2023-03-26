import styled from "styled-components";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentContainer(props) {
  const { postId, openComment, setTotalComments  } = props;
  const token = localStorage.getItem("token");
  const [commentsList, setCommentsList] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = `${process.env.REACT_APP_API_URL}/comments/${postId}`;
    const promise = axios.get(URL, config);

    promise.then((res) => {
      const { data } = res;
      setCommentsList([...data]);
      setTotalComments(commentsList.length);
    });

    promise.catch((err) => {
      alert(
        "An error occured while trying to fetch the comments, please refresh the page"
      );
    });
  }, [commentUpdate]);

  function buildCommentsList() {
    if (commentsList.length > 0) {
      return commentsList.map((postComment, key) => {
        const {
          comment,
          id,
          name,
          profile_picture
        } = postComment;
        return (
          <Comment
            key={key}
            userId={id}
            name={name}
            profile_picture={profile_picture}
            comment={comment}
          />
        );
      });
    } else {
      return <p>there are no comments yet!</p>;
    }
  }

  return (
    <CommentsList openComment={openComment}>
      <div data-test="comment-box">
        {buildCommentsList()}
        <CommentInput postId={postId} commentUpdate={commentUpdate} setCommentUpdate={setCommentUpdate} />
      </div>
    </CommentsList>
  );
}

const CommentsList = styled.div`
  display: ${props => props.openComment ? "block" : "none"};
  background-color: #1e1e1e;
  padding: 25px;
  margin-top: -40px;
  border-radius: 16px;
`;

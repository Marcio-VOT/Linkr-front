import styled from "styled-components";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function CommentContainer(props) {
  const {
    postId,
    openComment,
    setTotalComments,
    updateComments,
    setUpdateComments,
  } = props;
  const token = localStorage.getItem("token");
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = `${process.env.REACT_APP_API_URL}/comments/${postId}`;
    const promise = axios.get(URL, config);

    setLoading(true);

    promise.then((res) => {
      const { data } = res;
      setCommentsList([...data]);
      setTotalComments(commentsList.length);
      setLoading(false);
    });

    promise.catch((err) => {
      alert(
        "An error occured while trying to fetch the comments, please refresh the page"
      );
    });
  }, [updateComments]);

  return (
    <CommentsList openComment={openComment}>
      <div data-test="comment-box">
        {commentsList.length > 0 ? (
          commentsList.map((postComment, key) => {
            const { comment, id, name, profile_picture } = postComment;
            return (
              <Comment
                key={key}
                userId={id}
                name={name}
                profile_picture={profile_picture}
                comment={comment}
              />
            );
          })
        ) : loading ? (
          <div className="message-container">
            <TailSpin
              height="80"
              width="80"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="message-container">
            <p>there are no comments yet!</p>
          </div>
        )}

        <CommentInput
          postId={postId}
          updateComments={updateComments}
          setUpdateComments={setUpdateComments}
        />
      </div>
    </CommentsList>
  );
}

const CommentsList = styled.div`
  display: ${(props) => (props.openComment ? "block" : "none")};
  background-color: #1e1e1e;
  padding: 25px;
  margin-top: -40px;
  border-radius: 16px;

  .message-container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    color: white;
  }
`;

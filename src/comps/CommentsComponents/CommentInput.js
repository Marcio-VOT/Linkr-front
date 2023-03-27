import styled from "styled-components";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentInput(props) {
  const { postId, updateComments, setUpdateComments } = props;
  const token = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentData, setCommentData] = useState({
    postId: postId,
    comment: "",
  });

  function registerComment(event) {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = process.env.REACT_APP_API_URL;
    const promise = axios.post(`${URL}/comments`, commentData, config);
    setIsSubmitting(true);
    promise.then((result) => {
      setIsSubmitting(false);
      console.log(updateComments)
      setUpdateComments(!updateComments)
      setCommentData({commentData, comment: ""})
      alert("commented with sucessfull");
    });

    promise.catch(() => {
      alert("There was an error publishing your link.");
      setIsSubmitting(false);
    });
  }

  const { comment } = commentData;

  function handleForm(e) {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <CommentInputContainer>
      <form onSubmit={registerComment}>
        <img src={localStorage.getItem("avatar")} />
        <div className="inputButton">
          <input
            data-test="comment-input"
            type="text"
            id="comment"
            placeholder="write a comment..."
            required
            name="comment"
            onChange={handleForm}
            value={comment}
            disabled={isSubmitting}
          />
          <button type="submit" data-test="comment-submit" disabled={isSubmitting}>
            <BsSend />
          </button>
        </div>
      </form>
    </CommentInputContainer>
  );
}

const CommentInputContainer = styled.div`
  form {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 19px;

    button:focus,
    input:focus {
      outline: none;
    }
  }
  
  form > img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin-right: 14px;
  }

  .inputButton{
    height: 39px;
    width: 100%;
    background: #252525;
    border-radius: 8px;
  }

  form .inputButton > input {
    height: 100%;
    width: 90%;
    background: transparent;
    border: none;
    color: #575757;
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    padding: 10px 15px 10px 15px;
  }

  form .inputButton > button {
    height: 100%;
    width: 10%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: white;
  }
`;

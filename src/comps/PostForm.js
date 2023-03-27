import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function PostForm({updatePost, setUpdatePost}) {
  const token = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false)
  function registerPost(event) {
    event.preventDefault();
    const hashtags = [...postData.description.matchAll(/#[A-Za-z0-9]*/g)].map(e => e[0])

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {...postData, hashtags}

    const URL = process.env.REACT_APP_API_URL;
    const promise = axios.post(`${URL}/posts`, body, config);
    setIsSubmitting(true)
    promise.then((result) => {
      setUpdatePost(!updatePost)
      setPostData({ externalLink: "", description: "" });
      setIsSubmitting(false)
    });

    promise.catch(() => {
      alert("There was an error publishing your link");
      setIsSubmitting(false)
    });
  }

  const [postData, setPostData] = useState({
    externalLink: "",
    description: "",
  });

  const { externalLink, description } = postData;

  function handleForm(e) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <PostFormContainer>
      <FormContent>
        <CustomerData>
          <img src={localStorage.getItem("avatar")} />
          <p>What are you going to share today?</p>
        </CustomerData>
        <form onSubmit={registerPost} data-test="publish-box">
          <input
            className="link-input"
            type="url"
            id="url"
            placeholder=" http://..."
            required
            name="externalLink"
            data-test="link"
            onChange={handleForm}
            value={externalLink}
            disabled={isSubmitting}
          />
          <textarea
            className="description-textarea"
            type="text"
            id="description"
            placeholder=" Awesome article about #javascript"
            name="description"
            data-test="description"
            rows="4"
            cols="50"
            onChange={handleForm}
            value={description}
            disabled={isSubmitting}
          />

          <button type="submit" data-test="publish-btn" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </form>
      </FormContent>
    </PostFormContainer>
  );
}

const PostFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 16px;
  @media (max-width: 600px){
    border-radius: 0;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button:focus,
    textarea:focus,
    input:focus {
      outline: none;
    }

    input,
    textarea {
      width: 100%;
      background: #efefef;
      border-radius: 5px;
      border: none;
      margin-bottom: 5px;
    }

    .link-input {
      height: 30px;
    }

    .description-textarea {
      height: 66px;
    }

    button {
      width: 20%;
      height: 31px;
      color: #ffffff;
      background: #1877f2;
      border-radius: 5px;
      border: none;
    }
  }
`;

const CustomerData = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;

    color: #707070;
  }
`;

import { useState, useRef } from "react";
import LinkPreview from "../LinkPreview/LinkPreview";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../Like/Like";

export default function Post(props) {

  const token = localStorage.getItem("token");
  const { id, description, external_link, name, profile_picture, user_id } = props;

  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(description);
  const navigate = useNavigate();

  const editTextRef = useRef(null);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedText(description);
  };

  const handleSaveEdit = () => {
    const description = {
      description: `${editedText}`,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = `${process.env.REACT_APP_API_URL}/posts/${id}`;
    axios
      .put(URL, description, config)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.error("Erro ao atualizar post:", err.message);
        alert(err.message);
      });

    setEditing(false);
  };

  const handleEditKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCancelEdit();
    } else if (event.key === "Enter") {
      handleSaveEdit();
    }
  };


  return (
    <PostContainer data-test="post">
      <ButtonsContainer>
        {editing ? (
          <>
            <button data-test="save-btn" onClick={handleSaveEdit}>Save</button>
            <button data-test="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button data-test="edit-btn" onClick={handleEditClick}><BsFillPencilFill /></button>
        )}
        <button data-test="delete-btn"><BsFillTrashFill /></button>
      </ButtonsContainer>
      <CustomerData>
        <ImageLike>
          <img src={profile_picture} />
          <LikeButton />
        </ImageLike>
        <Container>
          <div>
            <p
              className="user-name"
              data-test="username"
              onClick={() => navigate(`/user/${user_id}`)}
            >
              {name}
            </p>
            {editing ? (
              <textarea
                data-test="edit-description"
                ref={editTextRef}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleEditKeyDown}
              />
            ) : (
              <ReactTagify tagStyle={tagStyle} tagClicked={(tag) => {
                navigate(`/hashtag/${tag.replace('#', '')}`)
              }}>
                <p className="user-description" data-test="description">
                  {description}
                </p>
              </ReactTagify>
            )}
          </div>
          <LinkPreview url={external_link} />
        </Container>
      </CustomerData>
    </PostContainer>
  );
}

const tagStyle = {
  fontWeight: "bold",
  cursor: "pointer",
};

const ImageLike = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const PostContainer = styled.div`
  display: flex;
  width: 100vw;
  max-width: 611px;
  padding: 20px;
  background: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  position: relative;
`;

const CustomerData = styled.div`
    width: 100%;
    display: flex;
    gap: 18px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .user-name{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    .user-description{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 10px;

  button {
    margin-right: 10px;
    cursor: pointer;
    color: white;
    background: none;
    border: none;
  }
`;

function ModalContent() {
  return (
    <div>
      <h2>Conteúdo do modal</h2>
      <p>Texto explicativo</p>
    </div>
  );
}

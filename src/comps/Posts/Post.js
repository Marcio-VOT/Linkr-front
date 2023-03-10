import { useState, useEffect, useRef } from "react";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Post(props) {
  const token = localStorage.getItem("token");
  const { id, description, external_link, name, profile_picture } = props;
  const [metadata, setMetadata] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(description);
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

    const URL = `http://localhost:5000/posts/${id}`;
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
  const navigate = useNavigate();

  return (
    <PostContainer>
      <div data-test="post">
        <CustomerData>
          <img src={profile_picture} />
          <div>
            <p className="user-name" data-test="username">
              {name}
            </p>
            <ReactTagify tagStyle={tagStyle} tagClicked={(tag) => alert(tag)}>
              <p className="user-description" data-test="description">
                {description}
              </p>
            </ReactTagify>
          </div>
        </CustomerData>
        <a href={external_link} target="_blank" data-test="link">
          {metadata?.title || "aqui vai o link"}
        </a>
      </div>
    </PostContainer>
  );
}

const tagStyle = {
  fontWeight: "bold",
  cursor: "pointer",
};

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  position: relative;
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

  .user-name {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
  }

  .user-description {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
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

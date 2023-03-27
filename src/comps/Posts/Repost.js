import { useState, useEffect, useRef } from "react";
import LinkPreview from "../LinkPreview/LinkPreview";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import axios from "axios";
import { IoMdRepeat } from "react-icons/io";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../Like/Like";
import Modal from "react-modal";

const customStyles = {

  overlay: {
    zIndex: 11
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function Repost(props) {
  console.log(props)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const { id, description, external_link, name, profile_picture, user_id, published_by} = props;
  const [editing, setEditing] = useState(false);
  const [count, setCount] = useState(0)
  const [published, setPublished] = useState(published_by)
  const [editedText, setEditedText] = useState(description);
  const navigate = useNavigate();
  const [modalIsOpenRepost, setModalIsOpenRepost] = useState(false);

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
        window.location.reload();
      })
      .catch((err) => {
        console.error("Erro ao atualizar post:", err.message);
        alert("only the creator of the post can update the post description.");
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

  //Delete 

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };

  const handleDeleteConfirm = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = `${process.env.REACT_APP_API_URL}/posts/${id}`;
    axios
      .delete(URL, config)
      .then((res) => {
        alert(res.data);
        setModalIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Erro ao excluir post:", err.message);
        alert("Only the creator of the post can delete it.");
        setModalIsOpen(false);
      });
  };

  const handleRepostConfirm = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const URL = `${process.env.REACT_APP_API_URL}/re-posts/${id}`;
    axios
      .post(URL, {}, config)
      .then((res) => {
        setModalIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Erro ao fazer repost:", err.message);
        setModalIsOpen(false);
      });
  };


  const handleRepostClick = () => {
    setModalIsOpenRepost(true);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/re-posts/${published_by}`
    axios.get(URL, config)
      .then(res => {
        console.log("repost ", res)
        setCount(res.data.count)
        setPublished(res.data.name)
      })
      .catch((err) => {
        console.error("Erro ao pegar total de re-repost:", err.message);
        alert("Erro interno");
      });
  }, [])

  if (published === name ) setPublished('you')
  return (
    <ContainerRepost>
      <RepostContainer>
        <span><IoMdRepeat/></span><span>Re-posted by</span> <span>{published}</span>
      </RepostContainer>
      <PostContainer data-test="post">
        {Number(userId) === user_id ? (
        <ButtonsContainer>
          <button data-test="edit-btn" onClick={editing ? handleCancelEdit : handleEditClick}><BsFillPencilFill /></button>
          <button data-test="delete-btn" onClick={handleDeleteClick}><BsFillTrashFill /></button>
        </ButtonsContainer>) : ""
        }
        <CustomerData>
          <ImageLike>
            <img src={profile_picture} alt=''/>
            <LikeButton idPost={id} idUser={userId} />
            <div className="icon" onClick={handleRepostClick}>
            <div><IoMdRepeat/></div>
            <div><span>{count}</span> <span>re-posts</span></div> 
            </div>
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
        <StyledModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Confirmar deleção"
          style={customStyles}
        >
          <div className="modal-content">
            <h2>Tem certeza que deseja deletar esse post?</h2>
            <div>
              <button data-test="confirm" className="btn-cancel" onClick={() => setModalIsOpen(false)}>No, go back</button>
              <button data-test="cancel" className="btn-confirm" onClick={handleDeleteConfirm}>Yes, delete it</button>
            </div>
          </div>
        </StyledModal>
        <StyledModal
          isOpen={modalIsOpenRepost}
          onRequestClose={() => setModalIsOpenRepost(false)}
          contentLabel="Confirmar re-post"
          style={customStyles}
        >
          <div className="modal-content">
            <h2>Do you want to re-post this link?</h2>
            <div>
              <button data-test="confirm" className="btn-cancel" onClick={() => setModalIsOpenRepost(false)}>No, cancel</button>
              <button data-test="cancel" className="btn-confirm" onClick={handleRepostConfirm}>Yes, share!</button>
            </div>
          </div>
        </StyledModal>
      </PostContainer>
  </ContainerRepost>
  );
}

const tagStyle = {
  fontWeight: "bold",
  cursor: "pointer",
  display: "inline"
};

const ImageLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60px;
  gap: 10px;
  
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    cursor: pointer;
    span {
      font-size: 10px;
    }
  }
`

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`

const ContainerRepost = styled.div`
`

const PostContainer = styled.div`
  display: flex;
  width: 100vw;
  max-width: 611px;
  padding: 20px;
  background: #171717;
  border-end-start-radius: 16px;
  border-end-end-radius: 16px;
  position: relative;
  @media (max-width: 600px){
    border-radius: 0;
  }
`;

const RepostContainer = styled.div`
  display: flex;
  gap: 2px;
  width: 100vw;
  max-width: 611px;
  padding: 10px;
  background: #1E1E1E;
  color: #FFFFFF;
  border-start-start-radius: 16px;
  border-start-end-radius: 16px;
  position: relative;
  @media (max-width: 600px){
    border-radius: 0;
  }
`

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
        cursor: pointer;
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

  button{
    margin-right: 10px;
    cursor: pointer;
    color: white;
    background: none;
    border: none;
  }
`
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 597px;
    height: 262px;
    background: #333333;
    border-radius: 50px;

  h2 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 20px;
  }

  button {
    margin-right: 10px;
    border: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
  }

  .btn-confirm{
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    color: white;
  }

  .btn-cancel{
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    color: #1877F2;
  }
  }
`;
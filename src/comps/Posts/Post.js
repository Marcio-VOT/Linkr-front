import { useState, useEffect } from "react";
import styled from "styled-components";
// import urlMetadata from "url-metadata";

export default function Post(props) {
  const { description, external_link, name, profile_picture } = props;
  const [metadata, setMetadata] = useState(null);

//   useEffect(() => {
//     urlMetadata(external_link)
//       .then((metadata) => {
//         setMetadata(metadata);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

  return (
    <PostContainer>
    <div data-test="post">
      <CustomerData>
        <img src={profile_picture} />
        <div>
          <p className="user-name" data-test="username">{name}</p>
          <p className="user-description" data-test="description">{description}</p>
        </div>
      </CustomerData>
      <a href={external_link} target="_blank" data-test="link">
        {metadata?.title || "aqui vai o link"}
      </a>
    </div>
  </PostContainer>
  );
}

const PostContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
`

const CustomerData = styled.div`
    display: flex;
    align-items: center;

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
`
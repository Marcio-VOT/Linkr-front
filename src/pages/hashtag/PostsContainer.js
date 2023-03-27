import Post from "../../comps/Posts/Post";
import styled from "styled-components";

export default function PostsContainer({ postsList }) {
  function buildPostsList() {
    if (postsList.length > 0) {
      return postsList.map((post) => {
        const {
          id,
          description,
          external_link,
          name,
          profile_picture,
          user_id,
        } = post;
        return (
          <Post
            key={id}
            id={id}
            description={description}
            external_link={external_link}
            name={name}
            profile_picture={profile_picture}
            user_id={user_id}
          />
        );
      });
    } else {
      return <p>there are no posts yet!</p>;
    }
  }

  return <PostsList>{buildPostsList()}</PostsList>;
}

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

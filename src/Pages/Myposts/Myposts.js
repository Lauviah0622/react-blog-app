import styled from "styled-components";
import { getMyPosts } from "../../WebAPI";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/features/fetch/fetchSlice";

function Post({ title, time, id }) {
  return (
    <PostItem>
      <PostTitle to={`/post/${id}`}>
        #{id} {title}
      </PostTitle>
      <PostTime>{new Date(time).toLocaleTimeString()}</PostTime>
    </PostItem>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  id: PropTypes.number,
};

const PostItem = styled.div`
  border-bottom: 1px solid #777;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 12px;
  }
`;

const PostTime = styled.p``;

const PostTitle = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  color: #000;
`;

const PostsListContainer = styled.div`
  max-width: 600px;
  margin: 30px auto;
`;

export default function MyPostsList() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector((store) => store.authState);
  useEffect(() => {
    if (!userState.user) {
      history.push("/");
      return;
    }
    dispatch(fetchData(() => getMyPosts(userState.user.id))).then(
      (response) => {
        console.log("response", response);
        setPosts(response);
      }
    );
  }, []);

  return (
    <PostsListContainer>
      {posts.length > 0 ? posts.map(({ title, id, createdAt }) => (
        <Post title={title} key={id} id={id} time={createdAt} />
      )) : 'no Posts'}
    </PostsListContainer>
  );
}

import styled from "styled-components";
import { getPosts } from "../../WebAPI";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/Contexts";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../redux/features/fetch/fetchSlice';

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

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const dispatch = useDispatch()
  const response = useSelector(store => store.fetchState.response);

  // dispatch 似乎有做優化，如果 store 沒有變化就不會 dispatch

  console.log('PostList render');

  useEffect(() => {
    dispatch(fetchData(getPosts)).then((response) => {
      console.log('List: response in dispatch ', response);
      // 發現這裡拿不到外面的 response，只能用 fetchData 裡面return 的
      setPosts(response)
      // setLoading(false)
    })

    // console.log("getPost");
    // getPosts().then((json) => {
    //   setPosts(json);
    //   // setLoading(false);
    // });
  }, []);
  console.log('PostList: response', response);

  return (
    <PostsListContainer>
      {posts.map(({ title, id, createdAt }) => (
        <Post title={title} key={id} id={id} time={createdAt} />
      ))}
    </PostsListContainer>
  );
}

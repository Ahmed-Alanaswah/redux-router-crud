import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { fetchPosts, deletePosts } from "../state/postSlice";
import Loading from "../components/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.posts);

  const deletePost = useCallback((id) => dispatch(deletePosts(id)), [dispatch]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Loading loading={loading} error={error}>
      <PostList data={records} deletePost={deletePost} />
    </Loading>
  );
};

export default Index;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { fetchPosts } from "../state/postSlice";

const Index = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);
  return (
    <div>
      <PostList />
    </div>
  );
};

export default Index;

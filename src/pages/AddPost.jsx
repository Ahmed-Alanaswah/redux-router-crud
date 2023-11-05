import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addPosts } from "../state/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.posts);
  const [titele, setTitele] = useState("");
  const [description, setDescription] = useState("");
  const formHandler = (e) => {
    e.preventDefault();

    console.log(titele);
    console.log(description);
    dispatch(addPosts({ titele, description }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={titele}
          onChange={(e) => setTitele(e.target.value)}
          type="text"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          add post
        </Button>
      </Loading>
    </Form>
  );
};

export default AddPost;

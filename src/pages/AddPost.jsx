import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addPosts } from "../state/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.posts);
  const [titele, setTitele] = useState("");
  const [description, setDescription] = useState("");
  const formHandler = (e) => {
    e.preventDefault();

    console.log(titele);
    console.log(description);
    dispatch(addPosts({ titele, description }));
    navigate("/");
  };
  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Titele</Form.Label>
        <Form.Control
          value={titele}
          onChange={(e) => setTitele(e.target.value)}
          type="text"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Deleteescription</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        add post
      </Button>
    </Form>
  );
};

export default AddPost;

import { useEffect, useState } from "react";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost, cleanRecored } from "../store/postSlice";

const EditPost = () => {
  const { id } = useParams();
  const { loading, error, record } = usePostDetails();

  const [titele, setTitele] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formHandler = (e) => {
    e.preventDefault();

    dispatch(updatePost({ id, titele, description }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (record) {
      setTitele(record?.titele);
      setDescription(record?.description);
    }
  }, [record]);

  useEffect(() => {
    return () => {
      dispatch(cleanRecored);
    };
  }, [dispatch]);

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

export default EditPost;

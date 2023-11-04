import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const PostListItem = ({ data, deletePost }) => {
  const deleteHandler = (item) => {
    if (window.confirm(`do you want to realy delete the ${item.titele}`)) {
      deletePost(item.id);
    }
  };

  const record = data.map((el, idx) => (
    <tr key={el.id}>
      <td>{++idx}</td>
      <td>{el.titele}</td>
      <td>{el.description}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success">Edit</Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{record}</>;
};

export default PostListItem;

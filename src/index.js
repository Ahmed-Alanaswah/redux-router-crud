import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RoootLayout from "./pages/RoootLayout";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Detail from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./state";

const postParamHandler = async (data) => {
  if (isNaN(data.params.id)) {
    throw new Response("Bad Request", {
      statusText: "please make sure to insert correct post id",
      status: 400,
    });
  }
  const postId = parseInt(data.params.id);

  return postId;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      { path: "post/add", element: <AddPost /> },
      {
        path: "post/:id/edit",
        element: <EditPost />,
        loader: postParamHandler,
      },
      {
        path: "post/:id",
        element: <Detail />,
        loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

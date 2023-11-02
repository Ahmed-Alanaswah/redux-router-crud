import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RoootLayout from "./pages/RoootLayout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Detail from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./state";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      { path: "post/add", element: <Add /> },
      { path: "post/:id/edit", element: <Edit /> },
      {
        path: "post/:id",
        element: <Detail />,
        loader: async (data) => {
          if (isNaN(data.params.id)) {
            throw new Response("Bad Request", {
              statusText: "please make sure to insert correct post id",
              status: 400,
            });
          }
          const postId = parseInt(data.params.id);

          return postId;
        },
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

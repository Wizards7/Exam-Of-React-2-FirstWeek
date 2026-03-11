import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout.js";
import InfoUser from "./pages/infoUser.js";
import Home from "./pages/home.js";
const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/infoUser/:id",
          element: <InfoUser />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

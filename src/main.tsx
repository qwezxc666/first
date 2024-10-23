import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
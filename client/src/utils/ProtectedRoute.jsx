import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
    }
  }, []);
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default ProtectedRoute;

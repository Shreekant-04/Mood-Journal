import { Routes, Route, Router } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { lazy } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/common/NavBar";
import Home from "./components/user/Home";
import NotFound from "./pages/NotFound";
const UserLayout = lazy(() => import("./pages/UserLayout"));
const JournalEntry = lazy(() => import("./pages/JournalEntry"));

export default function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<Register />} />
        <Route
          path="user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="entry/:id" element={<JournalEntry />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

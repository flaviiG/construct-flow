import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Homepage from "./pages/Homepage";
import AppAdmin from "./pages/AppAdmin";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import CustomerPage from "./pages/CustomerPage";
import Spinner from "./ui/Spinner";
import { useEffect } from "react";
import { getUserStatus } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(
    function () {
      dispatch(getUserStatus());
    },
    [dispatch]
  );
  if (isLoading) return <Spinner />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route
          path="admin"
          element={
            <ProtectedRouteAdmin>
              <AppAdmin />
            </ProtectedRouteAdmin>
          }
        ></Route>
        <Route
          path="customer/:id/:firstName/:lastName"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Homepage from "./pages/Homepage";
import AppAdmin from "./pages/AppAdmin";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import CustomerPage from "./pages/CustomerPage";
import Spinner from "./ui/Spinner";
import { useEffect, useState } from "react";
import { getUserStatus } from "./features/user/userSlice";
import ProjectDetails from "./ui/ProjectDetails";
import Instructions from "./ui/Instructions";
import ProjectList from "./features/projects/ProjectList";
import RequestsList from "./features/requests/RequestsList";
import ProjectAdminScreen from "./features/projects/ProjectAdminScreen";
import RequestAdminScreen from "./features/requests/RequestAdminScreen";
import RequestDetails from "./ui/RequestDetails";
import UpdatesList from "./features/updates/UpdatesList";
import UserDetails from "./ui/UserDetails";
import AddUpdateContainer from "./ui/AddUpdateContainer";
import ProjectCustomerScreen from "./features/projects/ProjectCustomerScreen";
import RequestCustomerScreen from "./features/requests/RequestCustomerScreen";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      setIsLoading(true);
      dispatch(getUserStatus());
      setIsLoading(false);
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
        >
          <Route index element={<Navigate replace to="projects" />} />
          <Route path="projects" element={<ProjectAdminScreen />}>
            <Route index element={<Navigate replace to="empty" />} />
            <Route path=":id" element={<ProjectDetails />}>
              <Route index element={<Navigate replace to="updates" />} />
              <Route path="updates" element={<UpdatesList />}>
                <Route path="addUpdate" element={<AddUpdateContainer />} />
              </Route>
              <Route path="user" element={<UserDetails />} />
            </Route>
            <Route path="empty" element={<Instructions />} />
          </Route>
          <Route path="requests" element={<RequestAdminScreen />}>
            <Route index element={<Navigate replace to="empty" />} />
            <Route path=":id" element={<RequestDetails />} />
            <Route path="empty" element={<Instructions />} />
          </Route>
        </Route>
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="projects" />} />
          <Route path="projects" element={<ProjectCustomerScreen />}>
            <Route index element={<Navigate replace to="empty" />} />
            <Route path=":id" element={<ProjectDetails />} />
            <Route path="empty" element={<Instructions />} />
          </Route>
          <Route path="requests" element={<RequestCustomerScreen />}>
            <Route index element={<Navigate replace to="empty" />} />
            <Route path=":id" element={<RequestDetails />} />
            <Route path="empty" element={<Instructions />} />
          </Route>
        </Route>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

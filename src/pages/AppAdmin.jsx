import ProjectList from "../features/projects/ProjectList";
import ProjectRequests from "../features/projects/ProjectRequests";
import styles from "./AppAdmin.module.css";
import AdminNav from "../ui/AdminNav";
import { useState } from "react";
import AddProjectContainer from "../ui/AddProjectContainer";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../features/projects/projectsSlice";
import { logout } from "../services/authAPI";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutRed } from "../features/user/userSlice";
import RequestsList from "../features/requests/RequestsList";
import { addRequest } from "../features/requests/requestsSlice";
import SideBar from "../ui/SideBar";

function AppAdmin() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleOpenAddProject() {
    setShowAddProject(true);
  }

  function handleOpenAddRequest() {
    setShowAddRequest(true);
  }

  function handleAddProject(user_id, name, description, image, status) {
    const newProject = { user_id, name, description, image, status };

    dispatch(addProject(newProject));
    setShowAddProject(false);
  }

  function handleAddRequest(user_id, name, description, image, budget) {
    const newRequest = { user_id, name, description, image, budget };

    dispatch(addRequest(newRequest));
    setShowAddRequest(false);
  }

  function handleLogout() {
    dispatch(logoutRed());
    navigate("/");
  }

  return (
    <>
      <div
        className={
          showAddProject || showAddRequest ? styles.pageBlur : styles.page
        }
      >
        <AdminNav
          handleAddProject={handleOpenAddProject}
          handleAddRequest={handleOpenAddRequest}
          handleLogout={handleLogout}
        />
        <Outlet />
      </div>

      {showAddRequest === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
            admin={true}
            isProject={false}
            handleAddProject={handleAddRequest}
            handleClose={() => setShowAddRequest(false)}
          />
        </div>
      ) : null}

      {showAddProject === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
            admin={true}
            isProject={true}
            handleAddProject={handleAddProject}
            handleClose={() => setShowAddProject(false)}
          />
        </div>
      ) : null}
    </>
  );
}

export default AppAdmin;

import ProjectList from "../features/projects/ProjectList";
import ProjectRequests from "../features/projects/ProjectRequests";
import styles from "./AppAdmin.module.css";
import AdminNav from "../ui/AdminNav";
import { useState } from "react";
import AddProjectContainer from "../ui/AddProjectContainer";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../features/projects/projectsSlice";
import { logout } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { logoutRed } from "../features/user/userSlice";
import RequestsList from "../features/requests/RequestsList";
import { addRequest } from "../features/requests/requestsSlice";

function AppAdmin() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);

  const navigate = useNavigate();

  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  function handleOpenAddProject() {
    setShowAddProject(true);
  }

  function handleOpenAddRequest() {
    setShowAddRequest(true);
  }

  function handleAddProject(name, description, image, status) {
    const newProject = { name, description, image, status };

    dispatch(addProject(newProject));
    setShowAddProject(false);
  }

  function handleAddRequest(name, description, image, budget) {
    const newRequest = { name, description, image, budget };

    dispatch(addRequest(newRequest));
    setShowAddProject(false);
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
        <div className={styles.layout}>
          <div>
            <RequestsList />
          </div>
          <div>
            <ProjectList />
          </div>
        </div>
      </div>

      {showAddRequest === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
            isProject={false}
            handleAddProject={handleAddRequest}
            handleClose={() => setShowAddRequest(false)}
          />
        </div>
      ) : null}

      {showAddProject === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
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

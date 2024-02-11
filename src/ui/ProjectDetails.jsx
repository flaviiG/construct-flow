import { Outlet, useParams } from "react-router-dom";
import styles from "./ProjectDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import UpdatesList from "../features/updates/UpdatesList";
import DetailsSideBar from "./DetailsSideBar";
import { useState } from "react";
import { updateStatus } from "../features/projects/projectsSlice";

function ProjectDetails() {
  const { id } = useParams();
  const projectId = Number(id);
  const { isLoading, projects } = useSelector((state) => state.projects);
  const { is_admin } = useSelector((state) => state.user);
  const project = projects.filter((req) => req.id === projectId)[0];

  const dispatch = useDispatch();

  const [isOpenInput, setIsOpenInput] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  function handleUpdateStatus() {
    dispatch(updateStatus(project, newStatus));
    setIsOpenInput(false);
    setNewStatus("");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.projectDetails}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className={styles.title}>{project.name}</h1>
            <br></br>
            <img src={project.image} alt=""></img>
            <br></br>
            <p className={styles.description}>
              Description: <br></br>
              {project.description}
            </p>
            <br></br>
            <p className={styles.description}>Status: {project.status}</p>
            {is_admin && (
              <>
                {" "}
                <span onClick={() => setIsOpenInput((o) => !o)}>
                  {isOpenInput ? "Cancel" : "Edit status"}
                </span>
                {isOpenInput && (
                  <>
                    <input
                      value={newStatus}
                      type="text"
                      placeholder="New status"
                      onChange={(e) => setNewStatus(e.target.value)}
                    ></input>{" "}
                    <span onClick={handleUpdateStatus}>Change</span>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <DetailsSideBar>{is_admin ? <Outlet /> : <UpdatesList />}</DetailsSideBar>
    </div>
  );
}

export default ProjectDetails;

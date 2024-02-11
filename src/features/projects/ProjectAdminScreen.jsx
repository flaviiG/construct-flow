import { Outlet } from "react-router-dom";
import styles from "./ProjectAdminScreen.module.css";
import ProjectList from "./ProjectList";
import SideBar from "../../ui/SideBar";

function ProjectAdminScreen() {
  return (
    <div className={styles.projectsLayout}>
      <SideBar>
        <ProjectList />
      </SideBar>
      <Outlet />
    </div>
  );
}

export default ProjectAdminScreen;

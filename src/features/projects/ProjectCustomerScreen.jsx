import { Outlet } from "react-router-dom";
import SideBar from "../../ui/SideBar";
import styles from "./ProjectCustomerScreen.module.css";
import ProjectList from "./ProjectList";

function ProjectCustomerScreen() {
  return (
    <div className={styles.projectsLayout}>
      <SideBar>
        <ProjectList />
      </SideBar>
      <Outlet />
    </div>
  );
}

export default ProjectCustomerScreen;

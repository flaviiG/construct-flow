import { Outlet } from "react-router-dom";
import styles from "./RequestAdminScreen.module.css";
import SideBar from "../../ui/SideBar";
import RequestsList from "./RequestsList";

function RequestAdminScreen() {
  return (
    <div className={styles.requestLayout}>
      <SideBar>
        <RequestsList />
      </SideBar>
      <Outlet />
    </div>
  );
}

export default RequestAdminScreen;

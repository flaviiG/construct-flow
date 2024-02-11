import { Outlet } from "react-router-dom";
import SideBar from "../../ui/SideBar";
import styles from "./RequestCustomerScreen.module.css";
import RequestsList from "./RequestsList";

function RequestCustomerScreen() {
  return (
    <div className={styles.requestLayout}>
      <SideBar>
        <RequestsList />
      </SideBar>
      <Outlet />
    </div>
  );
}

export default RequestCustomerScreen;

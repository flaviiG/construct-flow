import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";

function SideBar({ children }) {
  const { is_admin } = useSelector((state) => state.user);

  return (
    <div className={styles.sideBar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={is_admin ? "/admin/projects" : "/customer/projects"}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to={is_admin ? "/admin/requests" : "/customer/requests"}>
              Requests
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.sidebarChildren}>{children}</div>
    </div>
  );
}

export default SideBar;

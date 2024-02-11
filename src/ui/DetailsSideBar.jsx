import { NavLink } from "react-router-dom";
import styles from "./DetailsSideBar.module.css";
import { useSelector } from "react-redux";

function DetailsSideBar({ children }) {
  const { is_admin } = useSelector((state) => state.user);

  return (
    <div className={styles.sideBar}>
      {is_admin ? (
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="updates">Updates</NavLink>
            </li>
            <li>
              <NavLink to="user">User</NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <h1>Updates</h1>
      )}
      <div className={styles.sidebarChildren}>{children}</div>
    </div>
  );
}

export default DetailsSideBar;

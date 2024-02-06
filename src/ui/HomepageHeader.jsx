import { Link } from "react-router-dom";
import styles from "./HomepageHeader.module.css";

function HomepageHeader() {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src="/logo.png" width="128px" alt=""></img>
        <Link className={styles.link} to="/">
          <h1>CONSTRUCT FLOW</h1>
        </Link>
      </div>
      <div className={styles.linkList}>
        <li>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/admin" className={styles.link}>
            Projects
          </Link>
        </li>
      </div>
    </div>
  );
}

export default HomepageHeader;

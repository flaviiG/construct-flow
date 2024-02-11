import { useNavigate } from "react-router-dom";
import styles from "./AdminNav.module.css";
import PropTypes from "prop-types";

function AdminNav({ handleAddRequest, handleAddProject, handleLogout }) {
  const navigate = useNavigate();
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src="/logo.png" width="128px" alt=""></img>
        <h1 onClick={() => navigate("/")}>CONSTRUCT FLOW</h1>
      </div>
      <div className={styles.btnList}>
        <p onClick={handleAddRequest}>+ Add request</p>
        <p onClick={handleAddProject}>+ Add project</p>
        <p onClick={handleLogout}>Log out</p>
      </div>
    </div>
  );
}

AdminNav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleAddProject: PropTypes.func.isRequired,
  handleAddRequest: PropTypes.func.isRequired,
};

export default AdminNav;

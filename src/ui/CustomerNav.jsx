import { useNavigate } from "react-router-dom";
import styles from "./CustomerNav.module.css";
import PropTypes from "prop-types";

function CustomerNav({ handleAdd, handleLogout, firstName, lastName }) {
  const navigate = useNavigate();
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src="../../public/logo.png" width="128px" alt=""></img>
        <h1>
          Hello, {firstName} {lastName}
        </h1>
      </div>
      <div className={styles.btnList}>
        <p onClick={handleAdd}>+ Request a project</p>
        <p onClick={handleLogout}>Log out</p>
      </div>
    </div>
  );
}

CustomerNav.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default CustomerNav;

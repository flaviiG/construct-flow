import styles from "./OptionMenu.module.css";
import PropTypes from "prop-types";

function OptionMenu({ projectId, position, handleDelete, handleCloseMenu }) {
  return (
    <div
      className={styles.menuContainer}
      style={{ top: position.y, left: position.x }}
    >
      <header>
        <h3>Options</h3>
      </header>
      <div
        className={styles.delete}
        onClick={() => {
          handleDelete(projectId);
          handleCloseMenu();
        }}
      >
        Delete
      </div>
      <div onClick={handleCloseMenu}>Cancel</div>
    </div>
  );
}

OptionMenu.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
};

export default OptionMenu;

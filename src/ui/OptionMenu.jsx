import styles from "./OptionMenu.module.css";
import PropTypes from "prop-types";

function OptionMenu({
  position,
  handleDelete,
  handleCloseMenu,
  option1,
  handleOption1,
}) {
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
          handleDelete();
          handleCloseMenu();
        }}
      >
        Delete
      </div>
      {option1 && (
        <div
          onClick={() => {
            handleOption1();
            handleCloseMenu();
          }}
        >
          {option1}
        </div>
      )}
      <div onClick={handleCloseMenu}>Cancel</div>
    </div>
  );
}

OptionMenu.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  option1: PropTypes.string,
  handleOption1: PropTypes.func,
};

export default OptionMenu;

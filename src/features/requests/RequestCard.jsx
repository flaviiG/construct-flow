import PropTypes from "prop-types";
import styles from "./RequestCard.module.css";

function RequestCard({ request, onToggleMenu }) {
  return (
    <div className={styles.card}>
      <header>
        <h2>{request.name}</h2>
        <span onClick={(e) => onToggleMenu(e, request.id)}>&#10247;</span>
      </header>
      <div className={styles.details}>
        <img src={request.image} width="256px" alt=""></img>
        <p>{request.description}</p>
        <p>Budget: {request.budget}</p>
      </div>
    </div>
  );
}

RequestCard.propTypes = {
  request: PropTypes.object.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
};

export default RequestCard;

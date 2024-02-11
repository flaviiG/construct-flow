import PropTypes from "prop-types";
import styles from "./ProjectCard.module.css";

function ProjectCard({ type, project, onToggleMenu, onSelectCard }) {
  return (
    <div className={styles.card} onClick={() => onSelectCard(project.id)}>
      <header>
        <h2>{project.name}</h2>
        <span onClick={(e) => onToggleMenu(e, project.id)}>&#10247;</span>
      </header>
      <div className={styles.details}>
        <img src={project.image} width="256px" alt=""></img>
        <p>{project.description}</p>
        <p>Status: {project.status}</p>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
};

export default ProjectCard;

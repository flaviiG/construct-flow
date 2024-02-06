import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectsAPI";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { removeProject, setProjects } from "./projectsSlice";
import styles from "./ProjectList.module.css";
import OptionMenu from "../../ui/OptionMenu";

function ProjectList() {
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function toggleMenu(e, id) {
    const clickX = e.clientX;
    const clickY = e.clientY;
    // Check if there is enough space on the right, otherwise open on the left
    const x = window.innerWidth - clickX > 200 ? clickX : clickX - 200;

    // Check if there is enough space below, otherwise open above
    const y = window.innerHeight - clickY > 150 ? clickY : clickY - 150;
    setMenuOpen(!menuOpen);
    setSelectedProject(id);
    setPosition({ x, y });
  }

  function handleDelete(id) {
    dispatch(removeProject(id));
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  useEffect(
    function () {
      getProjects().then((data) => {
        dispatch(setProjects(data));
      });
    },
    [dispatch]
  );
  return (
    <>
      {menuOpen && (
        <OptionMenu
          projectId={selectedProject}
          position={position}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
        />
      )}
      <div
        className={styles.projectContainer}
        style={menuOpen ? { overflow: "hidden" } : {}}
      >
        {projects
          ? projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleMenu={toggleMenu}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default ProjectList;

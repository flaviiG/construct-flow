import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectsAPI";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  projectsLoaded,
  projectsLoading,
  removeProject,
  setProjects,
} from "./projectsSlice";
import styles from "./ProjectList.module.css";
import OptionMenu from "../../ui/OptionMenu";
import { useLocation, useNavigate } from "react-router-dom";

function ProjectList() {
  const { projects } = useSelector((state) => state.projects);
  const { id, is_admin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered_projects = [...projects]
    .filter((project) => is_admin || project.user_id === id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const location = useLocation();

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

  function handleDelete() {
    dispatch(removeProject(selectedProject));
    if (is_admin) {
      if (location !== "/admin/projects") navigate("/admin/projects");
    } else {
      if (location !== "/customer/projects") navigate("/customer/projects");
    }
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  function handleSelectCard(id) {
    setSelectedProject(id);
    navigate(`${id}`);
  }

  useEffect(
    function () {
      dispatch(projectsLoading());
      getProjects().then((data) => {
        if (data) {
          dispatch(setProjects(data));
          dispatch(projectsLoaded());
        }
      });
    },
    [dispatch]
  );
  return (
    <>
      {menuOpen && (
        <OptionMenu
          position={position}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
        />
      )}
      <div className={styles.listContainer}>
        {filtered_projects.length === 0 ? (
          <p>No projects</p>
        ) : (
          <div
            className={styles.projectContainer}
            style={menuOpen ? { overflow: "hidden" } : {}}
          >
            {filtered_projects
              ? filtered_projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onToggleMenu={toggleMenu}
                    onSelectCard={handleSelectCard}
                  />
                ))
              : null}
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectList;

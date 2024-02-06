import { useState } from "react";
import styles from "./AddProjectContainer.module.css";
import PropTypes from "prop-types";

function AddProjectContainer({
  handleClose,
  handleAddProject,
  isProject = false,
}) {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (isProject) handleAddProject(name, description, image, status);
    else handleAddProject(name, description, image, Number(status));
  }

  return (
    <div className={styles.addContainer}>
      <header>
        <h1>Add new building project</h1>
        <span onClick={handleClose}>&times;</span>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
        ></input>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Description"
        ></input>
        <input
          type={isProject ? "text" : "number"}
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          placeholder={isProject ? "Status" : "Budget"}
        ></input>

        <label className={styles.fileInput}>
          <input
            type="file"
            alt=""
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="Upload an image"
          ></input>
          Upload Image
        </label>
      </form>
      <div className={styles.image}>
        {image !== null ? (
          <img src={URL.createObjectURL(image)} alt=""></img>
        ) : null}
      </div>
      <footer>
        <p onClick={handleSubmit}>Add</p>
      </footer>
    </div>
  );
}

AddProjectContainer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAddProject: PropTypes.func.isRequired,
  isProject: PropTypes.bool,
};

export default AddProjectContainer;

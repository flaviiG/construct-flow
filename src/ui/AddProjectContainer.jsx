import { useEffect, useState } from "react";
import styles from "./AddProjectContainer.module.css";
import PropTypes from "prop-types";
import { getAllUsers } from "../services/userAPI";

import Select from "react-select";

function AddProjectContainer({
  handleClose,
  handleAddProject,
  isProject = false,
  admin = false,
}) {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [image, setImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.first_name + " " + user.last_name,
  }));

  const customSelectStyle = {
    control: (styles) => ({
      ...styles,
      background: "transparent",
      color: "white",
    }),
    menuList: (styles) => ({
      ...styles,
      background: "transparent",
      color: "white",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: "white",
      background: isFocused
        ? "rgba(0, 0, 0, 0.3)"
        : isSelected
        ? "rgba(0, 0, 0, 0.3)"
        : undefined,
      zIndex: 1,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
      fontStyle: "italic",
    }),
    menu: (base) => ({
      ...base,
      color: "white",
      background: "rgba(0, 0, 0, 0.3)",
      zIndex: 100,
    }),
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (admin && selectedUser === null) return;
    if (isProject)
      handleAddProject(selectedUser, name, description, image, status);
    //Add request - status becomes budget
    else
      handleAddProject(selectedUser, name, description, image, Number(status));
  }

  useEffect(
    function () {
      if (admin)
        getAllUsers().then((data) => {
          console.log("users", data);
          setUsers(data);
        });
    },
    [admin]
  );

  return (
    <div className={styles.addContainer}>
      <header>
        <h1>Add new building project</h1>
        <span onClick={handleClose}>&times;</span>
      </header>
      <div className={styles.formContainer}>
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
          {admin && (
            <div className={styles.select}>
              <Select
                placeholder="Select an user"
                styles={customSelectStyle}
                options={userOptions}
                onChange={(option) => setSelectedUser(option.value)}
              ></Select>
            </div>
          )}
        </form>
      </div>
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
  admin: PropTypes.bool,
};

export default AddProjectContainer;

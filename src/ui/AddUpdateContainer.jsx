import { useEffect, useState } from "react";
import styles from "./AddUpdateContainer.module.css";
import { useNavigate, useParams } from "react-router-dom";

import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useDispatch, useSelector } from "react-redux";
import { createUpdate } from "../features/updates/updatesSlice";

function AddUpdateContainer() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [images, setImages] = useState(null);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newUpdate = {
      project_id: id,
      title: name,
      description,
      images,
    };
    dispatch(createUpdate(newUpdate));
  }

  return (
    <div className={styles.addContainer}>
      <header>
        <h1>Add new update to the project</h1>
        <span onClick={() => navigate(-1)}>&larr;</span>
      </header>
      <div className={styles.formContainer}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update Title"
          ></input>
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description"
          ></input>

          <label className={styles.fileInput}>
            <input
              type="file"
              alt=""
              onChange={(e) => {
                console.log([...e.target.files]);
                setImages([...e.target.files]);
              }}
              placeholder="Upload an image"
              multiple
            ></input>
            Upload Image
          </label>
        </form>
      </div>
      <div className={styles.imagesSlide}>
        {images && (
          <Slide>
            {images !== null
              ? images.map((image, index) => (
                  <div key={index}>
                    <div
                      className={styles.slide}
                      style={{
                        backgroundImage: `url(${URL.createObjectURL(image)})`,
                      }}
                    ></div>
                  </div>
                ))
              : null}
          </Slide>
        )}
      </div>
      <footer>
        <p
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Add
        </p>
      </footer>
    </div>
  );
}

export default AddUpdateContainer;

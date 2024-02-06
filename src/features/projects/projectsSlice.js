import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";
import {
  createProject,
  updateProjectImage,
  deleteProject,
} from "../../services/projectsAPI";
import { uploadImage } from "../../services/storageAPI";

const supabaseImgUrl =
  "https://jdonnxlzzggztyagwzuq.supabase.co/storage/v1/object/public/images/";

const initialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addedProject(state, action) {
      console.log(action);
      state.projects.push(action.payload);
    },
    deletedProject(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    updatedProject: {
      prepare(id, new_project) {
        return {
          payload: {
            id,
            new_project,
          },
        };
      },

      reducer(state, action) {
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload.new_project : p
        );
      },
    },
  },
});

export const { setProjects, addedProject, deletedProject, updatedProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;

export const addProject = (project) => async (dispatch) => {
  console.log("Image File:", project.image);

  const [id, created_at] = await createProject(project);

  const imageName = `${project.name}${id}.jpg`;

  await uploadImage("images", imageName, project.image);

  const imageUrl = `${supabaseImgUrl}${imageName}`;

  await updateProjectImage(id, imageUrl);

  const newProject = {
    ...project,
    id: id,
    createdAt: created_at,
    image: imageUrl,
  };

  console.log(newProject);
  dispatch(addedProject(newProject));
};

export const removeProject = (id) => async (dispatch) => {
  try {
    await deleteProject(id);
    dispatch(deletedProject(id));
  } catch (err) {
    console.log(err);
  }
};

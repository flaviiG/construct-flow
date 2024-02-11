import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  updateProjectImage,
  deleteProject,
  updateStatusApi,
} from "../../services/projectsAPI";
import { deleteUnusedImages, uploadImage } from "../../services/storageAPI";

const supabaseImgUrl =
  "https://jdonnxlzzggztyagwzuq.supabase.co/storage/v1/object/public/images/";

const initialState = {
  projects: [],
  isLoading: true,
  selectedProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selectedProject = state.projects.filter(
        (project) => project.id === action.payload
      )[0];
    },
    projectsLoading(state, action) {
      state.isLoading = true;
    },
    projectsLoaded(state, action) {
      state.isLoading = false;
    },
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

export const {
  projectsLoading,
  projectsLoaded,
  setProjects,
  addedProject,
  deletedProject,
  updatedProject,
  setSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;

export const addProject =
  (project, uploadImg = true) =>
  async (dispatch) => {
    const [id, created_at] = await createProject(project);

    let imageUrl;
    if (uploadImg) {
      const imageName = `${project.name}${id}.jpg`;

      await uploadImage("images", imageName, project.image);

      imageUrl = `${supabaseImgUrl}${imageName}`;
    } else {
      imageUrl = project.image;
    }

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
    // await deleteUnusedImages();
    dispatch(deletedProject(id));
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = (project, status) => async (dispatch) => {
  try {
    const newProject = { ...project, status: status };

    await updateStatusApi(project.id, status);

    dispatch(updatedProject(project.id, newProject));
  } catch (err) {
    console.log(err);
  }
};

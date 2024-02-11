import { createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "../../services/storageAPI";
import { createUpdateApi, getUpdatesApi } from "../../services/updatesAPI";

const supabaseImgUrl =
  "https://jdonnxlzzggztyagwzuq.supabase.co/storage/v1/object/public/updates-images/";

const initialState = {
  updates: [],
};

const updatesSlice = createSlice({
  name: "updates",
  initialState: initialState,
  reducers: {
    setUpdates(state, action) {
      state.updates = action.payload;
    },
    createdUpdate(state, action) {
      console.log(state.updates);
      state.updates.push(action.payload);
    },
    deletedUpdate(state, action) {
      state.updates = state.updates.filter((u) => u.id !== action.payload);
    },
  },
});

export default updatesSlice.reducer;

export const { setUpdates, createdUpdate, deletedUpdate } =
  updatesSlice.actions;

export const createUpdate = (update) => async (dispatch) => {
  try {
    const { project_id, title, images } = update;

    let imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      const imageName = `update${project_id}${title}${i}.jpg`.replace(" ", "-");
      await uploadImage("updates-images", imageName, images[i]);
      const imageUrl = `${supabaseImgUrl}${imageName}`;
      imageUrls.push(imageUrl);
    }

    const newUpdate = {
      ...update,
      images: imageUrls,
    };

    const [id, created_at] = await createUpdateApi(newUpdate);
    // const id = 2;
    const newUpdate2 = {
      ...newUpdate,
      id: id,
      created_at,
    };

    console.log(newUpdate2);

    dispatch(createdUpdate(newUpdate2));

    return id;
  } catch (err) {
    console.log(err);
  }
};

export const getUpdates = (project_id) => async (dispatch) => {
  try {
    const updates = await getUpdatesApi(project_id);
    dispatch(setUpdates(updates));
  } catch (err) {
    console.log(err);
  }
};

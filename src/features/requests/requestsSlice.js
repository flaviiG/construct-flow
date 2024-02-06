import { createSlice } from "@reduxjs/toolkit";
import { createRequest, updateRequestImage } from "../../services/requestsAPI";
import { uploadImage } from "../../services/storageAPI";

const supabaseImgUrl =
  "https://jdonnxlzzggztyagwzuq.supabase.co/storage/v1/object/public/images/";

const initialState = {
  requests: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests(state, action) {
      state.requests = action.payload;
    },
    addedRequest(state, action) {
      state.requests.push(action.payload);
    },
    deletedRequest(state, action) {
      state.requests = state.requests.filter((p) => p.id !== action.payload);
    },
    updatedRequest: {
      prepare(id, new_project) {
        return {
          payload: {
            id,
            new_project,
          },
        };
      },
      reducer(state, action) {
        state.requests = state.requests.map((p) =>
          p.id === action.payload.id ? action.payload.new_project : p
        );
      },
    },
  },
});

export const { setRequests, addedRequest, deletedRequest, updatedRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;

export const addRequest = (request) => async (dispatch) => {
  try {
    console.log(request);

    const [id, created_at] = await createRequest(request);

    const imageName = `request${request.name}${id}.jpg`;

    await uploadImage("images", imageName, request.image);

    const imageUrl = `${supabaseImgUrl}${imageName}`;

    await updateRequestImage(id, imageUrl);

    const newRequest = {
      ...request,
      id: id,
      createdAt: created_at,
      image: imageUrl,
    };

    console.log(newRequest);
    dispatch(addedRequest(newRequest));
  } catch (err) {
    console.log(err);
  }
};

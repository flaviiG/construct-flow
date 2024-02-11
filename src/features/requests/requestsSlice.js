import { createSlice } from "@reduxjs/toolkit";
import {
  createRequest,
  removeRequest,
  updateRequestAccept,
  updateRequestImage,
} from "../../services/requestsAPI";
import { deleteUnusedImages, uploadImage } from "../../services/storageAPI";

const supabaseImgUrl =
  "https://jdonnxlzzggztyagwzuq.supabase.co/storage/v1/object/public/images/";

const initialState = {
  requests: [],
  isLoading: true,
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    requestsLoading(state, action) {
      state.isLoading = true;
    },
    requestsLoaded(state, action) {
      state.isLoading = false;
    },
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

export const {
  requestsLoading,
  requestsLoaded,
  setRequests,
  addedRequest,
  deletedRequest,
  updatedRequest,
} = requestsSlice.actions;

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
      accepted: false,
    };

    console.log(newRequest);
    dispatch(addedRequest(newRequest));
  } catch (err) {
    console.log(err);
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    await removeRequest(id);
    // await deleteUnusedImages();
    dispatch(deletedRequest(id));
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequest = (request, accepted) => async (dispatch) => {
  try {
    const id = request.id;
    await updateRequestAccept(id, accepted);
    dispatch(updatedRequest(id, request));
  } catch (err) {
    console.log(err);
  }
};

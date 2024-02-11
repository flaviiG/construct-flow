import requestsReducer from "./features/requests/requestsSlice";
import projectsReducer from "./features/projects/projectsSlice";
import userReducer from "./features/user/userSlice";
import updatesReducer from "./features/updates/updatesSlice";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const store = configureStore(
  {
    reducer: {
      requests: requestsReducer,
      projects: projectsReducer,
      user: userReducer,
      updates: updatesReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;

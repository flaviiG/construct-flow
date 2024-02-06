import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../../services/userAPI";
import { getUser, logIn, logout } from "../../services/authAPI";
import supabase from "../../services/supabase";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  is_admin: false,
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loading(state, action) {
      state.isLoading = true;
    },
    ready(state, action) {
      state.isLoading = false;
    },
    login: {
      prepare(id, firstName, lastName, email, is_admin) {
        return {
          payload: {
            id,
            firstName,
            lastName,
            email,
            is_admin,
          },
        };
      },

      reducer(state, action) {
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.id = action.payload.id;
        state.is_admin = action.payload.is_admin;
      },
    },
    logoutUser(state, action) {
      return initialState;
    },
    error(state, action) {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { login, loading, logoutUser, ready, error } = authSlice.actions;

export const logInUser = (email, password) => async (dispatch) => {
  dispatch(loading());
  console.log("Logging in user...");

  try {
    const id = await logIn(email, password);
    console.log("id: ", id);

    const user = await getUserDetails(id);
    console.log("Current user:", user);
    dispatch(
      login(user.id, user.firstName, user.lastName, user.email, user.is_admin)
    );
  } catch (err) {
    const error_message = JSON.stringify(err.message);
    console.log(error_message);
    if (error_message.includes("Email not confirmed"))
      dispatch(error("Please confirm your email"));
    else if (error_message.includes("Invalid login credentials"))
      dispatch(error("Invalid login credentials"));
  } finally {
    dispatch(ready());
  }
};

export const logoutRed = () => async (dispatch) => {
  await logout();
  dispatch(logoutUser());
};

export const setUser = () => async (dispatch) => {
  const data = await supabase.auth.getSession();
  const id = data.user.id;
  const user = getUserDetails(id);
  dispatch(
    login(user.id, user.firstName, user.lastName, user.email, user.is_admin)
  );
};

export const getUserStatus = () => async (dispatch) => {
  dispatch(loading());
  const data = await getUser();
  if (data === null) {
    dispatch(ready());
    return null;
  }
  const id = data.id;
  const user = await getUserDetails(id);
  dispatch(
    login(user.id, user.firstName, user.lastName, user.email, user.is_admin)
  );
  dispatch(ready());
};

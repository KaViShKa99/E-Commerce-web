import { LOGIN, LOGOUT } from "./types";
import axios from "../../utils/axios";

export const login = (details, permittedRoutes) => (dispatch) => {
  try {
    const convertDetails = JSON.parse(details)
    const accessToken = convertDetails.token

    axios.interceptors.request.use(
      function (config) {
        config.headers["Authorization"] = "Bearer " + accessToken;
        return config;
      },
      null,
      { synchronous: true }
    );

    // save to the session storage
    localStorage.setItem("userInfo", details);

    dispatch({
      type: LOGIN,
      payload: {
        accessToken,

        routes: permittedRoutes,
      },
    });
  } catch (error) {
    console.log(error)
  }
};

export const logout = (id) => (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      delete config.headers["Authorization"];
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // remove items from local storage
  localStorage.clear()
  // axios.defaults.headers.common.Authorization = null;

  setTimeout(() => {
    dispatch({
      type: LOGOUT,
    });
  }, 70);
};



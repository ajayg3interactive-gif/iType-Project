import axios from "axios";
import { getCurrentUser } from "./HelperFunctions";

const baseURL = "http://52.62.65.5/api";
const axiosCient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

axiosCient.interceptors.request.use(
  (config) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.access_token) {
      config.headers.Authorization = `Bearer ${currentUser.access_token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export async function postRequestRegister(URL, payload) {
  try {
    const res = await axiosCient.post(URL, payload);
    return res;
  } catch (err) {
    console.log("Error in postRequestRegister", err);
    return err;
  }
}

export async function getRequest(URL, params = {},) {
  try {
    const res = await axiosCient.get(URL,{params});
    return res;
  } catch (err) {
    console.log("Error in get method", err);
  }
}

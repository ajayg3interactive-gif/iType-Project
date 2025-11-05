import axios from "axios";

const baseURL = "http://52.62.65.5/api";
const axioxCient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

export async function postRequestRegister(URL, payload) {
  try {
    const res = await axioxCient.post(URL, payload);
    return res;
  } catch (err) {
    console.log("Error in postRequestRegister", err);
  }
}

export async function postRequestLogin(URL, payload) {
  try {
    const res = await axioxCient.post(URL, payload);
    return res;
  } catch (error) {
    console.log("Error in postRequestLogin", err);
  }
}

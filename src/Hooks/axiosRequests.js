import axios from "axios";

const baseURL = "http://52.62.65.5/api";
const axiosCient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

export async function postRequestRegister(URL, payload) {
  try {
    const res = await axiosCient.post(URL, payload);
    return res;
  } catch (err) {
    console.log("Error in postRequestRegister", err);
    return err;
  }
}

// export async function postRequestLogin(URL, payload) {
//   try {
//     const res = await axiosCient.post(URL, payload);
//     return res;
//   } catch (err) {
//     console.log("Error in postRequestLogin", err);
//   }
// }

// export async function postRequestChildLogin(URL, payload) {
//   try {
//     const res = await axiosCient.post(URL, payload);
//     return res;
//   } catch (err) {
//     console.log("Error in postRequestChildLogin", err);
//   }
// }

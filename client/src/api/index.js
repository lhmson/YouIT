import axios from "axios";

const url = "http://localhost:5000";

// const url = "https://youit-social-network.herokuapp.com";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export default API;

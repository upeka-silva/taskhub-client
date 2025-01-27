import axios from "axios";

export default  axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer auth_token",
  },
});

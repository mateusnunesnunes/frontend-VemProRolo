import axios from "axios";

const apiTest = axios.create({
  baseURL: "http://10.2.2.2:3001",
});

export default apiTest;
import axios from "axios";

const axiosIntance = axios.create({
  baseURL: process.env.BASE_URL_API,
});

export { axiosIntance };

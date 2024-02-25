import axios from "axios";

const instance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

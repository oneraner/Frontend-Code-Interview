import axios from "axios";

const baseURL = "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGetMaze = () => instance.get("/maze");

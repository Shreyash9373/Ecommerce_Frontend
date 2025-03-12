import axios from "axios";
import React from "react";

const useApi = () => {
  const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
};

export default useApi;

import axios from "axios";
import React from "react";

const useApi = () => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
};

export default useApi;

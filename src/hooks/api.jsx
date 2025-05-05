import axios from "axios";
import React from "react";

const useApi = () => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/v1/`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Add request interceptor to include auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default useApi;
import api from "./api";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
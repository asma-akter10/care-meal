import api from "./api";

export const getFoods = async () => {
  const response = await api.get("/foods/");
  return response.data;
};

export const getFoodById = async (id: number) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (payload: {
  title: string;
  description?: string;
  price: number;
  calories?: number;
  diet_type: string;
  disease_tag?: string;
  image_url?: string;
}) => {
  const response = await api.post("/foods/", payload);
  return response.data;
};

export const getMyFoods = async () => {
  const response = await api.get("/foods/mine");
  return response.data;
};

export const deleteFood = async (id: number) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data;
};
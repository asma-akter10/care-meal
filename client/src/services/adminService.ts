import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const getHomemakers = async () => {
  const response = await api.get("/admin/homemakers");
  return response.data;
};

export const approveHomemaker = async (userId: number) => {
  const response = await api.put(`/admin/homemakers/${userId}/approve`);
  return response.data;
};

export const rejectHomemaker = async (userId: number) => {
  const response = await api.put(`/admin/homemakers/${userId}/reject`);
  return response.data;
};
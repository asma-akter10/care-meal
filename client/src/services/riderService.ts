import api from "./api";

export const getAvailableOrders = async () => {
  const response = await api.get("/rider/orders/available");
  return response.data;
};

export const getRiderOrders = async () => {
  const response = await api.get("/rider/orders");
  return response.data;
};

export const assignOrder = async (orderId: number) => {
  const response = await api.put(`/rider/orders/${orderId}/assign`);
  return response.data;
};

export const updateRiderOrderStatus = async (orderId: number, status: string) => {
  const response = await api.put(`/rider/orders/${orderId}/status`, { status });
  return response.data;
};
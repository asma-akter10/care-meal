import api from "./api";

export const createOrder = async (payload: {
  items: any[];
  total_amount: number;
  delivery_address: string;
  note?: string;
}) => {
  const response = await api.post("/orders/", payload);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};
export const getHomemakerOrders = async () => {
  const res = await api.get("/orders/homemaker");
  return res.data;
};

export const updateOrderStatus = async (id: number, status: string) => {
  const res = await api.put(`/orders/${id}/status`, { status });
  return res.data;
};
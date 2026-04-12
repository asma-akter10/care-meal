import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getMyOrders } from "../../services/orderService";

type Order = {
  id: number;
  total_amount: number;
  delivery_address: string;
  note?: string;
  status: string;
  created_at: string;
  items_count: number;
};


function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">My Orders</h1>

          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
              No orders found.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-slate-900">Order #{order.id}</h2>
                    {/* <span className="text-sm px-3 py-1 rounded-full border border-purple-200 text-purple-600">
                      {order.status}
                    </span> */
                    <span
  className={`text-sm px-3 py-1 rounded-full ${
    order.status === "pending"
      ? "bg-gray-100 text-gray-600"
      : order.status === "accepted"
      ? "bg-green-100 text-green-600"
      : order.status === "cooking"
      ? "bg-yellow-100 text-yellow-600"
      : order.status === "delivered"
      ? "bg-purple-100 text-purple-600"
      : "bg-red-100 text-red-600"
  }`}
>
  {order.status}
</span>}
                  </div>

                  <p className="text-sm text-slate-500">Items: {order.items_count}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Address: {order.delivery_address}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Date: {new Date(order.created_at).toLocaleString()}
                  </p>

                  <div className="mt-4 font-semibold text-purple-600">
                    ৳{order.total_amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Orders;
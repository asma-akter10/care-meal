import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getHomemakerOrders, updateOrderStatus } from "../../services/orderService";

function HomemakerOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    const data = await getHomemakerOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdate = async (id: number, status: string) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">
            Incoming Orders
          </h1>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-2xl border border-slate-100"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Order #{order.id}</p>
                  <span className="text-purple-600">{order.status}</span>
                </div>

                <p className="text-sm text-slate-500">
                  ৳{order.total_amount}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(order.id, "accepted")}
                    className="px-3 py-1 border border-green-400 text-green-600 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "rejected")}
                    className="px-3 py-1 border border-red-400 text-red-600 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "cooking")}
                    className="px-3 py-1 border border-yellow-400 text-yellow-600 rounded"
                  >
                    Cooking
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "delivered")}
                    className="px-3 py-1 border border-purple-400 text-purple-600 rounded"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomemakerOrders;
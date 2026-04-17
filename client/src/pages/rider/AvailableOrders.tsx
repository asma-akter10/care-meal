import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { assignOrder, getAvailableOrders } from "../../services/riderService";
import toast from "react-hot-toast";

function AvailableOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    try {
      const data = await getAvailableOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load available orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAssign = async (orderId: number) => {
    try {
      await assignOrder(orderId);
      loadOrders();
      toast.success("Order assigned successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to assign order");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">
              Available Orders
            </h1>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
                  No available orders.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-slate-900">Order #{order.id}</p>
                      <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                        {order.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500">
                      Address: {order.delivery_address}
                    </p>
                    <p className="mt-3 font-semibold text-purple-600">
                      ৳{order.total_amount}
                    </p>

                    <button
                      onClick={() => handleAssign(order.id)}
                      className="mt-4 px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
                    >
                      Take Order
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default AvailableOrders;
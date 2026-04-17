import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getHomemakerOrders, updateOrderStatus } from "../../services/orderService";
import toast from "react-hot-toast";

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
    try {
      await updateOrderStatus(id, status);
      toast.success("Order status updated");
      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "assigned_to_rider":
        return "Assigned to Rider";
      case "ready_for_pickup":
        return "Ready for Pickup";
      case "on_the_way":
        return "On the Way";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const canAccept = (status: string) => status === "pending";
  const canReject = (status: string) => status === "pending";
  const canCook = (status: string) =>
    status === "accepted" || status === "assigned_to_rider";
  const canReady = (status: string) => status === "cooking";

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
                  <p className="font-semibold text-slate-900">Order #{order.id}</p>
                  <span className="text-purple-600">{formatStatus(order.status)}</span>
                </div>

                <p className="text-sm text-slate-500">৳{order.total_amount}</p>

                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleUpdate(order.id, "accepted")}
                    disabled={!canAccept(order.status)}
                    className={`px-3 py-1 rounded border ${
                      canAccept(order.status)
                        ? "border-green-400 text-green-600"
                        : "border-slate-200 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "rejected")}
                    disabled={!canReject(order.status)}
                    className={`px-3 py-1 rounded border ${
                      canReject(order.status)
                        ? "border-red-400 text-red-600"
                        : "border-slate-200 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "cooking")}
                    disabled={!canCook(order.status)}
                    className={`px-3 py-1 rounded border ${
                      canCook(order.status)
                        ? "border-yellow-400 text-yellow-600"
                        : "border-slate-200 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Cooking
                  </button>

                  <button
                    onClick={() => handleUpdate(order.id, "ready_for_pickup")}
                    disabled={!canReady(order.status)}
                    className={`px-3 py-1 rounded border ${
                      canReady(order.status)
                        ? "border-blue-400 text-blue-600"
                        : "border-slate-200 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Ready for Pickup
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
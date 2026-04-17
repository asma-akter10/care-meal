import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { getRiderOrders, updateRiderOrderStatus } from "../../services/riderService";
import toast from "react-hot-toast";

function MyRiderOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    try {
      const data = await getRiderOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load rider orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdate = async (orderId: number, status: string) => {
    try {
      await updateRiderOrderStatus(orderId, status);
      toast.success("Delivery status updated");
      loadOrders();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "assigned_to_rider":
        return "Assigned to Rider";
      case "ready_for_pickup":
        return "Ready for Pickup";
      case "picked_up":
        return "Picked Up";
      case "on_the_way":
        return "On The Way";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const canPickUp = (status: string) => status === "ready_for_pickup";
  const canOnTheWay = (status: string) => status === "picked_up";
  const canDeliver = (status: string) => status === "on_the_way";

  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">
              My Deliveries
            </h1>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
                  No assigned deliveries.
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
                        {formatStatus(order.status)}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500">
                      Address: {order.delivery_address}
                    </p>
                    <p className="mt-3 font-semibold text-purple-600">
                      ৳{order.total_amount}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdate(order.id, "picked_up")}
                        disabled={!canPickUp(order.status)}
                        className={`px-4 py-2 rounded-full text-sm border ${
                          canPickUp(order.status)
                            ? "border-blue-400 text-blue-600"
                            : "border-slate-200 text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        Picked Up
                      </button>

                      <button
                        onClick={() => handleUpdate(order.id, "on_the_way")}
                        disabled={!canOnTheWay(order.status)}
                        className={`px-4 py-2 rounded-full text-sm border ${
                          canOnTheWay(order.status)
                            ? "border-yellow-400 text-yellow-600"
                            : "border-slate-200 text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        On The Way
                      </button>

                      <button
                        onClick={() => handleUpdate(order.id, "delivered")}
                        disabled={!canDeliver(order.status)}
                        className={`px-4 py-2 rounded-full text-sm border ${
                          canDeliver(order.status)
                            ? "border-green-400 text-green-600"
                            : "border-slate-200 text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        Delivered
                      </button>
                    </div>
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

export default MyRiderOrders;
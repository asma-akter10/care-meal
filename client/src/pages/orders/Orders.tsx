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
  payment_method: string;
payment_status: string;
transaction_id?: string | null;
  rider?: {
    id: number;
    name: string;
    phone: string;
  } | null;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "assigned_to_rider":
        return "Rider Assigned";
      case "cooking":
        return "Cooking";
      case "ready_for_pickup":
        return "Ready for Pickup";
      case "picked_up":
        return "Picked Up";
      case "on_the_way":
        return "On the Way";
      case "delivered":
        return "Delivered";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-600";
      case "accepted":
        return "bg-green-100 text-green-600";
      case "assigned_to_rider":
        return "bg-purple-100 text-purple-600";
      case "cooking":
        return "bg-yellow-100 text-yellow-700";
      case "ready_for_pickup":
        return "bg-blue-100 text-blue-600";
      case "picked_up":
        return "bg-indigo-100 text-indigo-600";
      case "on_the_way":
        return "bg-fuchsia-100 text-fuchsia-600";
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const timelineSteps = [
    "pending",
    "accepted",
    "assigned_to_rider",
    "cooking",
    "ready_for_pickup",
    "picked_up",
    "on_the_way",
    "delivered",
  ];

  const getStepLabel = (step: string) => {
    switch (step) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "assigned_to_rider":
        return "Rider Assigned";
      case "cooking":
        return "Cooking";
      case "ready_for_pickup":
        return "Ready";
      case "picked_up":
        return "Picked Up";
      case "on_the_way":
        return "On The Way";
      case "delivered":
        return "Delivered";
      default:
        return step;
    }
  };

  const getStepState = (orderStatus: string, step: string) => {
    const currentIndex = timelineSteps.indexOf(orderStatus);
    const stepIndex = timelineSteps.indexOf(step);

    if (orderStatus === "rejected") {
      return "rejected";
    }

    if (stepIndex < currentIndex) {
      return "done";
    }

    if (stepIndex === currentIndex) {
      return "current";
    }

    return "upcoming";
  };

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

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">Items: {order.items_count}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Address: {order.delivery_address}
                  </p>

                  {order.note ? (
                    <p className="text-sm text-slate-500 mt-1">Note: {order.note}</p>
                  ) : null}

                  <p className="text-sm text-slate-500 mt-1">
                    Date: {new Date(order.created_at).toLocaleString()}
                  </p>
                  {/* <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
  <p className="text-sm font-medium text-slate-800">Payment</p>
  <p className="mt-1 text-sm text-slate-600">
    Method: {order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}
  </p>
  <p className="text-sm text-slate-600">
    Status: {order.payment_status}
  </p>
  {order.transaction_id ? (
    <p className="text-sm text-slate-600">
      Transaction ID: {order.transaction_id}
    </p>
  ) : null}
</div> */}

                  {order.rider ? (
                    <div className="mt-3 rounded-xl border border-purple-100 bg-purple-50 p-4">
                      <p className="text-sm font-medium text-slate-800">Assigned Rider</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Name: {order.rider.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        Phone: {order.rider.phone}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      Rider not assigned yet.
                    </div>
                  )}

                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
  <p className="text-sm font-medium text-slate-800">Payment</p>
  <p className="mt-1 text-sm text-slate-600">
    Method: {order.payment_method === "cod"
      ? "Cash on Delivery"
      : order.payment_method === "bkash"
      ? "bKash"
      : order.payment_method === "nagad"
      ? "Nagad"
      : "Card"}
  </p>
  <p className="text-sm text-slate-600">
    Status: {order.payment_status}
  </p>
  {order.transaction_id ? (
    <p className="text-sm text-slate-600">
      Transaction ID: {order.transaction_id}
    </p>
  ) : null}
</div>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Order Timeline
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timelineSteps.map((step) => {
                        const state = getStepState(order.status, step);

                        return (
                          <div
                            key={step}
                            className={`rounded-xl border px-3 py-2 text-xs text-center ${
                              state === "done"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : state === "current"
                                ? "bg-purple-50 border-purple-200 text-purple-700"
                                : state === "rejected"
                                ? "bg-red-50 border-red-200 text-red-600"
                                : "bg-slate-50 border-slate-200 text-slate-400"
                            }`}
                          >
                            {getStepLabel(step)}
                          </div>
                        );
                      })}
                    </div>
                  </div>

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
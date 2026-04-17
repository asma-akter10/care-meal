import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { getAllOrders } from "../../services/adminService";

function ManageOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load orders");
      }
    };

    loadOrders();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">All Orders</h1>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900">Order #{order.id}</p>
                    <span className="text-sm px-3 py-1 rounded-full border border-purple-200 text-purple-600">
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">Customer ID: {order.customer_id}</p>
                  <p className="text-sm text-slate-500 mt-1">{order.delivery_address}</p>

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

                  <p className="mt-3 font-semibold text-purple-600">৳{order.total_amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default ManageOrders;
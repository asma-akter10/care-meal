import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function CustomerDashboard() {
  const { user } = useAuth();
  const { items, totalAmount } = useCart();

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <MainLayout>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-8">Customer Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Welcome</h2>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Cart Items</h2>
                <p>{items.length} items</p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Cart Total</h2>
                <p>৳{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default CustomerDashboard;
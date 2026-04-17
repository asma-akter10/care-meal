import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

function RiderDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Rider Dashboard
              </h1>
              <p className="mt-2 text-slate-500">
                View available deliveries and manage assigned orders.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Name</p>
                <p className="mt-3 font-semibold text-slate-900 text-lg">
                  {user?.name}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-3 font-semibold text-slate-900 text-lg break-words">
                  {user?.email}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-3 inline-flex px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-5">
              <Link
                to="/rider/available-orders"
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                  📦
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Available Orders
                </h3>
                <p className="mt-2 text-slate-500 leading-7">
                  See accepted orders and pick one for delivery.
                </p>
              </Link>

              <Link
                to="/rider/my-orders"
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                  🚚
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  My Deliveries
                </h3>
                <p className="mt-2 text-slate-500 leading-7">
                  Update pickup, on-the-way, and delivered status.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default RiderDashboard;
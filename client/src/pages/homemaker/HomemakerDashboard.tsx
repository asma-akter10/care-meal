import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

function HomemakerDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["homemaker"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">
              Homemaker Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Name</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.name}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.email}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.status}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
  to="/homemaker/orders"
  className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
>
  View Orders
</Link>
              <Link
                to="/homemaker/foods"
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
              >
                Manage Foods
              </Link>

              <Link
                to="/homemaker/foods/new"
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
              >
                Add New Food
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default HomemakerDashboard;
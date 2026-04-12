import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

function RiderDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <MainLayout>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">Rider Dashboard</h1>
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{user?.name}</h2>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default RiderDashboard;

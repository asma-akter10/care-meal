import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { getAllUsers } from "../../services/adminService";

function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load users");
      }
    };

    loadUsers();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">All Users</h1>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-purple-600">{user.role}</p>
                      <p className="text-sm text-slate-500">{user.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default ManageUsers;
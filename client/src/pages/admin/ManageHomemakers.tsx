import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import {
  approveHomemaker,
  getHomemakers,
  rejectHomemaker,
} from "../../services/adminService";

function ManageHomemakers() {
  const [homemakers, setHomemakers] = useState<any[]>([]);

  const loadHomemakers = async () => {
    try {
      const data = await getHomemakers();
      setHomemakers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load homemakers");
    }
  };

  useEffect(() => {
    loadHomemakers();
  }, []);

  const handleApprove = async (userId: number) => {
    try {
      await approveHomemaker(userId);
      loadHomemakers();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Approve failed");
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await rejectHomemaker(userId);
      loadHomemakers();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Reject failed");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">
              Homemaker Approval
            </h1>

            <div className="space-y-4">
              {homemakers.map((item) => (
                <div
                  key={item.user_id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.email}</p>
                    </div>

                    <span className="text-sm px-3 py-1 rounded-full border border-purple-200 text-purple-600">
                      {item.approval_status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(item.user_id)}
                      className="px-4 py-2 border border-green-400 text-green-600 rounded-full text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(item.user_id)}
                      className="px-4 py-2 border border-red-400 text-red-600 rounded-full text-sm"
                    >
                      Reject
                    </button>
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

export default ManageHomemakers;
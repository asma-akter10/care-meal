import { Link } from "react-router-dom";
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
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Customer Dashboard
              </h1>
              <p className="mt-2 text-slate-500">
                Manage your foods, cart, and orders from one place.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-sm text-slate-500">Welcome</h2>
                <p className="mt-3 font-semibold text-slate-900 text-lg">{user?.name}</p>
                <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-sm text-slate-500">Cart Items</h2>
                <p className="mt-3 font-semibold text-slate-900 text-lg">
                  {items.length} items
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-sm text-slate-500">Cart Total</h2>
                <p className="mt-3 font-semibold text-purple-600 text-lg">
                  ৳{totalAmount}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/foods"
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition"
              >
                Browse Foods
              </Link>

              <Link
                to="/cart"
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition"
              >
                View Cart
              </Link>

              <Link
                to="/orders"
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default CustomerDashboard;


// import { Link } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";
// import ProtectedRoute from "../../components/common/ProtectedRoute";
// import { useAuth } from "../../hooks/useAuth";
// import { useCart } from "../../hooks/useCart";

// function CustomerDashboard() {
//   const { user } = useAuth();
//   const { items, totalAmount } = useCart();

//   return (
//     <ProtectedRoute allowedRoles={["customer"]}>
//       <MainLayout>
//         <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
//           <div className="max-w-6xl mx-auto">
//             <h1 className="text-3xl font-bold mb-8 text-slate-900">
//               Customer Dashboard
//             </h1>

//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
//                 <h2 className="text-sm text-slate-500">Welcome</h2>
//                 <p className="mt-2 font-semibold text-slate-900">{user?.name}</p>
//                 <p className="text-sm text-slate-500">{user?.email}</p>
//               </div>

//               <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
//                 <h2 className="text-sm text-slate-500">Cart Items</h2>
//                 <p className="mt-2 font-semibold text-slate-900">{items.length} items</p>
//               </div>

//               <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
//                 <h2 className="text-sm text-slate-500">Cart Total</h2>
//                 <p className="mt-2 font-semibold text-purple-600">৳{totalAmount}</p>
//               </div>
//             </div>

//             <div className="mt-8 flex flex-wrap gap-4">
//               <Link
//                 to="/foods"
//                 className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
//               >
//                 Browse Foods
//               </Link>

//               <Link
//                 to="/cart"
//                 className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
//               >
//                 View Cart
//               </Link>

//               <Link
//                 to="/orders"
//                 className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl"
//               >
//                 My Orders
//               </Link>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }

// export default CustomerDashboard;
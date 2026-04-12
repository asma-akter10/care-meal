import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Cart from "../pages/cart/Cart";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Foods from "../pages/public/Foods";
import FoodDetails from "../pages/public/FoodDetails";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import HomemakerDashboard from "../pages/homemaker/HomemakerDashboard";
import RiderDashboard from "../pages/rider/RiderDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Orders from "../pages/orders/Orders";
import HomemakerFoods from "../pages/homemaker/HomemakerFoods";
import AddFood from "../pages/homemaker/AddFood";
import HomemakerOrders from "../pages/homemaker/HomemakerOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageHomemakers from "../pages/admin/ManageHomemakers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homemaker/foods" element={<HomemakerFoods />} />
      <Route path="/homemaker/foods/new" element={<AddFood />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/foods" element={<Foods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
    <Route path="/cart" element={<Cart />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/homemaker/dashboard" element={<HomemakerDashboard />} />
      <Route path="/rider/dashboard" element={<RiderDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/homemaker/orders" element={<HomemakerOrders />} />
      <Route path="/admin/users" element={<ManageUsers />} />
<Route path="/admin/orders" element={<ManageOrders />} />
<Route path="/admin/homemakers" element={<ManageHomemakers />} />
    </Routes>
  );
}

export default AppRoutes;
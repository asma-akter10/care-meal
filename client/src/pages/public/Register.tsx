import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await register(form);

    if (user) {
      navigate("/");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Register
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 outline-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            name="role"
            className="w-full mb-6 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 outline-none"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="homemaker">Homemaker</option>
            <option value="rider">Rider</option>
          </select>

          <button
            type="submit"
            className="w-full border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4 text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}

export default Register;
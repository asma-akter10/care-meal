import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await login(form.email, form.password);

    if (user) {
      navigate("/");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 outline-none focus:border-purple-400"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 outline-none focus:border-purple-400"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4 text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-purple-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}

export default Login;
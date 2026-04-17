import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Care <span className="text-purple-600">Meal</span>
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Healthy food based on your diet
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="/" className="text-slate-600 hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="/foods" className="text-slate-600 hover:text-purple-600 transition">
              Foods
            </Link>
            <Link to="/cart" className="text-slate-600 hover:text-purple-600 transition">
              Cart
            </Link>
            <Link to="/login" className="text-slate-600 hover:text-purple-600 transition">
              Login
            </Link>
            <Link to="/register" className="text-slate-600 hover:text-purple-600 transition">
              Register
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-sm text-slate-400">
          © 2025 Care Meal
        </div>
      </div>
    </footer>
  );
}

export default Footer;
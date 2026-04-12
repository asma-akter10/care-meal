import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { getRoleRedirectPath } from "../../utils/roleRedirect";

function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-slate-900">
        Care <span className="text-purple-600">Meal</span>
      </h1>

      <div className="flex items-center gap-4">

        <Link to="/" className="text-slate-700 hover:text-purple-600">
          Home
        </Link>

        <Link to="/foods" className="text-slate-700 hover:text-purple-600">
          Foods
        </Link>

        <Link to="/cart" className="relative text-slate-700 hover:text-purple-600">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* 🔥 Logged in user */}
        {user ? (
          <>
            <Link
              to={getRoleRedirectPath(user.role)}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 border border-slate-300 rounded-full text-sm text-slate-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-slate-300 rounded-full text-sm text-slate-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
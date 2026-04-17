import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { getRoleRedirectPath } from "../../utils/roleRedirect";

function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm md:text-[15px] transition ${
      isActive
        ? "text-purple-600 font-medium"
        : "text-slate-600 hover:text-purple-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFF]/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white/90 border border-slate-200 rounded-2xl px-4 md:px-6 py-3 shadow-sm flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Care <span className="text-purple-600">Meal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/foods" className={navLinkClass}>
              Foods
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              <span className="relative inline-flex items-center">
                Cart
                {totalItems > 0 && (
                  <span className="ml-2 inline-flex min-w-[22px] h-[22px] items-center justify-center rounded-full bg-purple-600 px-1.5 text-[11px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
              </span>
            </NavLink>

            {user?.role === "customer" && (
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={getRoleRedirectPath(user.role)}
                  className="px-4 py-2 rounded-full bg-purple-50 text-purple-600 border border-purple-200 text-sm font-medium hover:bg-purple-100 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative text-slate-700 text-sm">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 inline-flex min-w-[20px] h-[20px] items-center justify-center rounded-full bg-purple-600 px-1.5 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <Link
                to={getRoleRedirectPath(user.role)}
                className="px-3 py-2 rounded-full bg-purple-600 text-white text-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-full border border-slate-300 text-slate-700 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
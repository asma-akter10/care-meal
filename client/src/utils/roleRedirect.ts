import type { UserRole } from "../types/user";

export const getRoleRedirectPath = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "customer":
      return "/customer/dashboard";
    case "homemaker":
      return "/homemaker/dashboard";
    case "rider":
      return "/rider/dashboard";
    default:
      return "/";
  }
};
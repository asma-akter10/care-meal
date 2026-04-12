export type UserRole = "admin" | "customer" | "homemaker" | "rider";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status?: string;
}
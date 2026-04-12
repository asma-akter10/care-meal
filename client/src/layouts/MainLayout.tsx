import type { ReactNode } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
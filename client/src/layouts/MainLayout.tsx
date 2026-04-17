import type { ReactNode } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFF] flex flex-col">
      <Navbar />
      <main className="flex-1 bg-[#FAFAFF]">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
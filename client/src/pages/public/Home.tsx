import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen">
        {/* HERO */}
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-10 grid md:grid-cols-2 gap-8 items-center">
          
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Care <span className="text-purple-600">Meal</span>
            </h1>

            <p className="mt-4 text-slate-500">
              Healthy food based on your diet
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/foods"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium"
              >
                Browse Foods
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 border border-slate-900 text-purple-600 rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="/images/hero-meal.avif"
              alt="Healthy food"
              className="w-full h-[300px] object-cover rounded-3xl shadow-sm"
            />
          </div>
        </div>

        {/* SIMPLE FOOD PREVIEW */}
        <div className="max-w-5xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Diabetic Meal",
                img: "https://images.unsplash.com/photo-1547592180-85f173990554",
              },
              {
                title: "Low Salt Food",
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
              },
              {
                title: "Healthy Bowl",
                img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={item.img}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="font-medium text-slate-800">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
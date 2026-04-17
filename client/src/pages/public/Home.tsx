// import { Link } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";

// function Home() {
//   return (
//     <MainLayout>
//       <div className="bg-[#FAFAFF] min-h-screen">
//         {/* HERO */}
//         <div className="max-w-5xl mx-auto px-4 pt-16 pb-10 grid md:grid-cols-2 gap-8 items-center">
          
//           {/* LEFT TEXT */}
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//               Care <span className="text-purple-600">Meal</span>
//             </h1>

//             <p className="mt-4 text-slate-500">
//               Healthy food based on your diet
//             </p>

//             <div className="mt-6 flex gap-4">
//               <Link
//                 to="/foods"
//                 className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium"
//               >
//                 Browse Foods
//               </Link>

//               <Link
//                 to="/register"
//                 className="px-6 py-3 border border-slate-900 text-purple-600 rounded-full"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div>
//             <img
//               src="/images/hero-meal.avif"
//               alt="Healthy food"
//               className="w-full h-[300px] object-cover rounded-3xl shadow-sm"
//             />
//           </div>
//         </div>

//         {/* SIMPLE FOOD PREVIEW */}
//         <div className="max-w-5xl mx-auto px-4 pb-16">
//           <div className="grid md:grid-cols-3 gap-5">
//             {[
//               {
//                 title: "Diabetic Meal",
//                 img: "https://images.unsplash.com/photo-1547592180-85f173990554",
//               },
//               {
//                 title: "Low Salt Food",
//                 img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
//               },
//               {
//                 title: "Healthy Bowl",
//                 img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
//               },
//             ].map((item) => (
//               <div
//                 key={item.title}
//                 className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               >
//                 <img
//                   src={item.img}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <p className="font-medium text-slate-800">{item.title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// export default Home;
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className="bg-[#FAFAFF]">
        <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm text-purple-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Healthy meals for your diet
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                Eat better,
                <br />
                feel better
                <br />
                with <span className="text-purple-600">Care Meal</span>
              </h1>

              <p className="mt-5 max-w-xl text-base md:text-lg leading-8 text-slate-500">
                Explore healthy foods by category, find meals that match your needs,
                and order in a few simple steps.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/foods"
                  className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-sm"
                >
                  Explore Foods
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-white transition"
                >
                  Get Started
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Diabetic", "Low Salt", "Low Fat", "High Protein"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-purple-200/40 blur-3xl" />
              <div className="absolute -bottom-6 -right-2 h-40 w-40 rounded-full bg-fuchsia-200/40 blur-3xl" />

              <div className="relative bg-white border border-slate-200 rounded-[32px] p-4 shadow-sm">
                <img
                  src="/images/hero-meal.avif"
                  alt="Healthy food"
                  className="w-full h-[320px] md:h-[430px] object-cover rounded-[24px]"
                />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur border border-white rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Today’s healthy pick</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      Fresh meals made for better choices
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                🥗
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Smart categories
              </h3>
              <p className="mt-2 text-slate-500 leading-7">
                Browse foods by diet type and find the right meal faster.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                🛒
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Easy ordering
              </h3>
              <p className="mt-2 text-slate-500 leading-7">
                Add to cart, checkout easily, and manage your orders smoothly.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                🚚
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Track status
              </h3>
              <p className="mt-2 text-slate-500 leading-7">
                Stay updated from pending to delivered with clear order status.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-[32px] px-6 md:px-10 py-10 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">
              Start now
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Find the right meal for your day
            </h2>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/foods"
                className="px-6 py-3 rounded-full bg-white text-purple-600 font-medium hover:bg-purple-50 transition"
              >
                Browse Foods
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getFoods } from "../../services/foodService";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import type { Food } from "../../types/food";

function Foods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<string[]>(["ALL"]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sort, setSort] = useState("default");
  const { addToCart } = useCart();

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const params: { search?: string; diet_type?: string } = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (selectedCategory !== "ALL") {
        params.diet_type = selectedCategory;
      }

      const data = await getFoods(params);
      setFoods(data);

      const allFoods = await getFoods();
      const uniqueCategories = Array.from(
        new Set(
          allFoods
            .map((item: Food) => item.diet_type)
            .filter((value: string) => value && value.trim() !== "")
        )
      );

      setCategories(["ALL", ...uniqueCategories]);
    } catch (error) {
      console.error("Failed to load foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFoods();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, selectedCategory]);

  const sortedFoods = useMemo(() => {
    const temp = [...foods];

    if (sort === "low") {
      temp.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "high") {
      temp.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return temp;
  }, [foods, sort]);

  const groupedFoods = useMemo(() => {
    if (selectedCategory !== "ALL") {
      return {
        [selectedCategory]: sortedFoods,
      };
    }

    return sortedFoods.reduce((acc: Record<string, Food[]>, food) => {
      if (!acc[food.diet_type]) {
        acc[food.diet_type] = [];
      }
      acc[food.diet_type].push(food);
      return acc;
    }, {});
  }, [sortedFoods, selectedCategory]);

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Foods</h1>
            <p className="mt-2 text-slate-500">
              Explore meals by category, search by name, and sort by price.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 md:p-5 mb-8">
            <div className="flex flex-col lg:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by food name"
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-700"
              >
                <option value="default">Sort</option>
                <option value="low">Price Low → High</option>
                <option value="high">Price High → Low</option>
              </select>

              <button
                onClick={fetchFoods}
                className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  {category === "ALL" ? "All" : category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : foods.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">
              No foods found.
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedFoods).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {category}
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((food) => (
                      <div
                        key={food.id}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition"
                      >
                        <img
                          src={
                            food.image_url ||
                            "https://via.placeholder.com/400x300?text=Food"
                          }
                          alt={food.title}
                          className="w-full h-48 object-cover"
                        />

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900 text-lg">
                                {food.title}
                              </p>
                              <p className="text-sm text-slate-500 mt-1">
                                By {food.provider_name || "Unknown"}
                              </p>
                            </div>

                            <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                              ⭐ {food.rating ?? 0}
                            </span>
                          </div>

                          <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                            {food.description || "No description available."}
                          </p>

                          <div className="mt-4 space-y-1 text-sm text-slate-500">
                            <p>
                              <span className="font-medium text-slate-700">Category:</span>{" "}
                              {food.diet_type}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">Useful for:</span>{" "}
                              {food.disease_tag || "General wellness"}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">Calories:</span>{" "}
                              {food.calories ?? "N/A"}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-5">
                            <span className="text-purple-600 font-semibold text-xl">
                              ৳{food.price}
                            </span>

                            <div className="flex gap-2">
                              <Link
                                to={`/foods/${food.id}`}
                                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-full text-sm hover:bg-slate-50 transition"
                              >
                                Details
                              </Link>

                              <button
                                onClick={() => {
                                  addToCart({
                                    id: food.id,
                                    title: food.title,
                                    price: food.price,
                                    image_url: food.image_url,
                                    diet_type: food.diet_type,
                                  });
                                  toast.success("Added to cart");
                                }}
                                className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm hover:bg-purple-50 transition"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Foods;

// // import { useEffect, useMemo, useState } from "react";
// // import { Link } from "react-router-dom";
// // import MainLayout from "../../layouts/MainLayout";
// // import { getFoods } from "../../services/foodService";
// // import { useCart } from "../../hooks/useCart";
// // import toast from "react-hot-toast";
// // import type { Food } from "../../types/food";

// // const categories = [
// //   "ALL",
// //   "DIABETIC",
// //   "LOW_SALT",
// //   "LOW_FAT",
// //   "HIGH_PROTEIN",
// //   "HEALTHY",
// //   "GENERAL",
// // ];

// // function Foods() {
// //   const [foods, setFoods] = useState<Food[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("ALL");
// //   const { addToCart } = useCart();
// //   const [sort, setSort] = useState("default");
// //   const fetchFoods = async () => {
// //     try {
// //       setLoading(true);

// //       const params: { search?: string; diet_type?: string } = {};

// //       if (search.trim()) {
// //         params.search = search.trim();
// //       }

// //       if (selectedCategory !== "ALL") {
// //         params.diet_type = selectedCategory;
// //       }

// //       const data = await getFoods(params);
// //       setFoods(data);
// //     } catch (error) {
// //       console.error("Failed to load foods:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const delay = setTimeout(() => {
// //       fetchFoods();
// //     }, 500);

// //     return () => clearTimeout(delay);
// //   }, [search, selectedCategory]);

// //   const sortedFoods = useMemo(() => {
// //   let temp = [...foods];

// //   if (sort === "low") {
// //     temp.sort((a, b) => a.price - b.price);
// //   } else if (sort === "high") {
// //     temp.sort((a, b) => b.price - a.price);
// //   }

// //   return temp;
// // }, [foods, sort]);

// //   const groupedFoods = useMemo(() => {
// //   if (selectedCategory !== "ALL") {
// //     return {
// //       [selectedCategory]: sortedFoods,
// //     };
// //   }

// //   return sortedFoods.reduce((acc: Record<string, Food[]>, food) => {
// //     if (!acc[food.diet_type]) {
// //       acc[food.diet_type] = [];
// //     }
// //     acc[food.diet_type].push(food);
// //     return acc;
// //   }, {});
// // }, [sortedFoods, selectedCategory]);

// //   return (
// //     <MainLayout>
// //       <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
// //         <div className="max-w-6xl mx-auto">
// //           <div className="flex flex-col gap-4 mb-8">
// //             <h1 className="text-3xl font-bold text-slate-900">Foods</h1>

// //             <div className="flex flex-col md:flex-row gap-3">
// //               <input
// //                 type="text"
// //                 placeholder="Search by food name"
// //                 className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 bg-white"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //               />

// //               <button
// //                 onClick={fetchFoods}
// //                 className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl font-medium"
// //               >
// //                 Search
// //               </button>
// //             </div>
// //             <select
// //   value={sort}
// //   onChange={(e) => setSort(e.target.value)}
// //   className="border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-700"
// // >
// //   <option value="default">Sort</option>
// //   <option value="low">Price Low → High</option>
// //   <option value="high">Price High → Low</option>
// // </select>

// //             <div className="flex flex-wrap gap-3">
// //               {categories.map((category) => (
// //                 <button
// //                   key={category}
// //                   onClick={() => setSelectedCategory(category)}
// //                   className={`px-4 py-2 rounded-full text-sm border ${
// //                     selectedCategory === category
// //                       ? "bg-purple-600 text-white border-purple-600"
// //                       : "bg-white text-purple-600 border-purple-200"
// //                   }`}
// //                 >
// //                   {category === "ALL" ? "All" : category}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {loading ? (
// //             <p className="text-slate-500">Loading...</p>
// //           ) : foods.length === 0 ? (
// //             <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
// //               No foods found.
// //             </div>
// //           ) : (
// //             <div className="space-y-10">
// //               {Object.entries(groupedFoods).map(([category, items]) => (
// //                 <div key={category}>
// //                   <h2 className="text-2xl font-bold text-slate-900 mb-4">
// //                     {category}
// //                   </h2>

// //                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
// //                     {items.map((food) => (
// //                       <div
// //                         key={food.id}
// //                         className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
// //                       >
// //                         <img
// //                           src={
// //                             food.image_url ||
// //                             "https://via.placeholder.com/400x300?text=Food"
// //                           }
// //                           alt={food.title}
// //                           className="w-full h-44 object-cover"
// //                         />

// //                         <div className="p-4">
// //                           <div className="flex items-start justify-between gap-3">
// //                             <div>
// //                               <p className="font-semibold text-slate-900">
// //                                 {food.title}
// //                               </p>
// //                               <p className="text-sm text-slate-500 mt-1">
// //                                 By {food.provider_name || "Unknown"}
// //                               </p>
// //                             </div>

// //                             <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-600">
// //                               ⭐ {food.rating ?? 0}
// //                             </span>
// //                           </div>

// //                           <p className="text-sm text-slate-600 mt-3 line-clamp-2">
// //                             {food.description || "No description available."}
// //                           </p>

// //                           <div className="mt-3 space-y-1 text-sm text-slate-500">
// //                             <p>
// //                               <span className="font-medium text-slate-700">
// //                                 Category:
// //                               </span>{" "}
// //                               {food.diet_type}
// //                             </p>
// //                             <p>
// //                               <span className="font-medium text-slate-700">
// //                                 Useful for:
// //                               </span>{" "}
// //                               {food.disease_tag || "General wellness"}
// //                             </p>
// //                             <p>
// //                               <span className="font-medium text-slate-700">
// //                                 Calories:
// //                               </span>{" "}
// //                               {food.calories ?? "N/A"}
// //                             </p>
// //                           </div>

// //                           <div className="flex justify-between items-center mt-4">
// //                             <span className="text-purple-600 font-semibold text-lg">
// //                               ৳{food.price}
// //                             </span>

// //                             <div className="flex gap-2">
// //                               <Link
// //                                 to={`/foods/${food.id}`}
// //                                 className="px-4 py-2 border border-slate-300 text-slate-700 rounded-full text-sm"
// //                               >
// //                                 Details
// //                               </Link>

// //                               <button
// //                                 onClick={() => {
// //                                   addToCart({
// //                                     id: food.id,
// //                                     title: food.title,
// //                                     price: food.price,
// //                                     image_url: food.image_url,
// //                                     diet_type: food.diet_type,
// //                                   });

// //                                   toast.success("Added to cart");
// //                                 }}
// //                                 className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
// //                               >
// //                                 Add
// //                               </button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </MainLayout>
// //   );
// // }

// // export default Foods;

// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";
// import { getFoods } from "../../services/foodService";
// import { useCart } from "../../hooks/useCart";
// import toast from "react-hot-toast";
// import type { Food } from "../../types/food";

// const categories = [
//   "ALL",
//   "DIABETIC",
//   "LOW_SALT",
//   "LOW_FAT",
//   "HIGH_PROTEIN",
//   "HEALTHY",
//   "GENERAL",
// ];

// function Foods() {
//   const [foods, setFoods] = useState<Food[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [sort, setSort] = useState("default");
//   const { addToCart } = useCart();

//   const fetchFoods = async () => {
//     try {
//       setLoading(true);

//       const params: { search?: string; diet_type?: string } = {};

//       if (search.trim()) {
//         params.search = search.trim();
//       }

//       if (selectedCategory !== "ALL") {
//         params.diet_type = selectedCategory;
//       }

//       const data = await getFoods(params);
//       setFoods(data);
//     } catch (error) {
//       console.error("Failed to load foods:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchFoods();
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [search, selectedCategory]);

//   const sortedFoods = useMemo(() => {
//     const temp = [...foods];

//     if (sort === "low") {
//       temp.sort((a, b) => Number(a.price) - Number(b.price));
//     } else if (sort === "high") {
//       temp.sort((a, b) => Number(b.price) - Number(a.price));
//     }

//     return temp;
//   }, [foods, sort]);

//   const groupedFoods = useMemo(() => {
//     if (selectedCategory !== "ALL") {
//       return {
//         [selectedCategory]: sortedFoods,
//       };
//     }

//     return sortedFoods.reduce((acc: Record<string, Food[]>, food) => {
//       if (!acc[food.diet_type]) {
//         acc[food.diet_type] = [];
//       }
//       acc[food.diet_type].push(food);
//       return acc;
//     }, {});
//   }, [sortedFoods, selectedCategory]);

//   return (
//     <MainLayout>
//       <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-slate-900">Foods</h1>
//             <p className="mt-2 text-slate-500">
//               Explore meals by category, search by name, and sort by price.
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 md:p-5 mb-8">
//             <div className="flex flex-col lg:flex-row gap-3">
//               <input
//                 type="text"
//                 placeholder="Search by food name"
//                 className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 bg-white"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />

//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-700"
//               >
//                 <option value="default">Sort</option>
//                 <option value="low">Price Low → High</option>
//                 <option value="high">Price High → Low</option>
//               </select>

//               <button
//                 onClick={fetchFoods}
//                 className="px-5 py-3 border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition"
//               >
//                 Search
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-3 mt-4">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm border transition ${
//                     selectedCategory === category
//                       ? "bg-purple-600 text-white border-purple-600"
//                       : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
//                   }`}
//                 >
//                   {category === "ALL" ? "All" : category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {loading ? (
//             <p className="text-slate-500">Loading...</p>
//           ) : foods.length === 0 ? (
//             <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">
//               No foods found.
//             </div>
//           ) : (
//             <div className="space-y-10">
//               {Object.entries(groupedFoods).map(([category, items]) => (
//                 <div key={category}>
//                   <h2 className="text-2xl font-bold text-slate-900 mb-4">
//                     {category}
//                   </h2>

//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//                     {items.map((food) => (
//                       <div
//                         key={food.id}
//                         className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition"
//                       >
//                         <img
//                           src={
//                             food.image_url ||
//                             "https://via.placeholder.com/400x300?text=Food"
//                           }
//                           alt={food.title}
//                           className="w-full h-48 object-cover"
//                         />

//                         <div className="p-5">
//                           <div className="flex items-start justify-between gap-3">
//                             <div>
//                               <p className="font-semibold text-slate-900 text-lg">
//                                 {food.title}
//                               </p>
//                               <p className="text-sm text-slate-500 mt-1">
//                                 By {food.provider_name || "Unknown"}
//                               </p>
//                             </div>

//                             <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-600">
//                               ⭐ {food.rating ?? 0}
//                             </span>
//                           </div>

//                           <p className="text-sm text-slate-600 mt-3 line-clamp-2">
//                             {food.description || "No description available."}
//                           </p>

//                           <div className="mt-4 space-y-1 text-sm text-slate-500">
//                             <p>
//                               <span className="font-medium text-slate-700">Category:</span>{" "}
//                               {food.diet_type}
//                             </p>
//                             <p>
//                               <span className="font-medium text-slate-700">Useful for:</span>{" "}
//                               {food.disease_tag || "General wellness"}
//                             </p>
//                             <p>
//                               <span className="font-medium text-slate-700">Calories:</span>{" "}
//                               {food.calories ?? "N/A"}
//                             </p>
//                           </div>

//                           <div className="flex justify-between items-center mt-5">
//                             <span className="text-purple-600 font-semibold text-xl">
//                               ৳{food.price}
//                             </span>

//                             <div className="flex gap-2">
//                               <Link
//                                 to={`/foods/${food.id}`}
//                                 className="px-4 py-2 border border-slate-300 text-slate-700 rounded-full text-sm hover:bg-slate-50 transition"
//                               >
//                                 Details
//                               </Link>

//                               <button
//                                 onClick={() => {
//                                   addToCart({
//                                     id: food.id,
//                                     title: food.title,
//                                     price: food.price,
//                                     image_url: food.image_url,
//                                     diet_type: food.diet_type,
//                                   });
//                                   toast.success("Added to cart");
//                                 }}
//                                 className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm hover:bg-purple-50 transition"
//                               >
//                                 Add
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// export default Foods;
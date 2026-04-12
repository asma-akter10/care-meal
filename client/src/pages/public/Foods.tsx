import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getFoods } from "../../services/foodService";
import { useCart } from "../../hooks/useCart";
import type { Food } from "../../types/food";

function Foods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data);
      } catch (error) {
        console.error("Failed to load foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Foods</h1>

          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : foods.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
              No foods found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
                >
                  <img
                    src={food.image_url || "https://via.placeholder.com/400x300?text=Food"}
                    alt={food.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <p className="font-medium text-slate-800">{food.title}</p>
                    <p className="text-sm text-slate-500 mt-1">{food.diet_type}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-purple-600 font-semibold">
                        ৳{food.price}
                      </span>

                      <button
                        onClick={() =>
                          addToCart({
                            id: food.id,
                            title: food.title,
                            price: food.price,
                            image_url: food.image_url,
                            diet_type: food.diet_type,
                          })
                        }
                        className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
                      >
                        Add
                      </button>
                    </div>
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
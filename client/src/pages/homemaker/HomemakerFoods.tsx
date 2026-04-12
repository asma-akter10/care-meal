import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { deleteFood, getMyFoods } from "../../services/foodService";
import type { Food } from "../../types/food";

function HomemakerFoods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const data = await getMyFoods();
      setFoods(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load your foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFood(id);
      setFoods((prev) => prev.filter((food) => food.id !== id));
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900">My Foods</h1>
            <Link
              to="/homemaker/foods/new"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm"
            >
              Add Food
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : foods.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
              No foods added yet.
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
                        onClick={() => handleDelete(food.id)}
                        className="px-4 py-2 border border-red-300 text-red-500 rounded-full text-sm"
                      >
                        Delete
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

export default HomemakerFoods;
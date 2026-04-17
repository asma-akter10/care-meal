import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getFoodById } from "../../services/foodService";
import { useCart } from "../../hooks/useCart";
import type { Food } from "../../types/food";
import { getFoods } from "../../services/foodService";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);

  const [relatedFoods, setRelatedFoods] = useState<Food[]>([]);


  useEffect(() => {
    const fetchFood = async () => {
      try {
        if (!id) return;
        const data = await getFoodById(Number(id));
        setFood(data);
      } catch (error) {
        console.error("Failed to load food details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  useEffect(() => {
  const fetchRelated = async () => {
    if (!food) return;

    try {
      const data = await getFoods({ diet_type: food.diet_type });
      const filtered = data.filter((f: Food) => f.id !== food.id);
      setRelatedFoods(filtered.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  };

  fetchRelated();
}, [food]);

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto text-slate-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!food) {
    return (
      <MainLayout>
        <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
            Food not found.
          </div>
        </div>
      </MainLayout>
    );
  }

  

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              to="/foods"
              className="inline-flex items-center text-sm text-purple-600 hover:underline"
            >
              ← Back to Foods
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-slate-50">
                <img
                  src={
                    food.image_url ||
                    "https://via.placeholder.com/800x600?text=Food"
                  }
                  alt={food.title}
                  className="w-full h-full min-h-[320px] object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      {food.title}
                    </h1>
                    <p className="mt-2 text-slate-500">
                      By {food.provider_name || "Unknown"}
                    </p>
                  </div>

                  <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                    ⭐ {food.rating ?? 0}
                  </span>
                </div>

                <p className="mt-5 text-slate-600 leading-7">
                  {food.description || "No description available for this food."}
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-100 bg-[#FAFAFF] p-4">
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {food.diet_type}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-[#FAFAFF] p-4">
                    <p className="text-sm text-slate-500">Useful For</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {food.disease_tag || "General wellness"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-[#FAFAFF] p-4">
                    <p className="text-sm text-slate-500">Calories</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {food.calories ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-[#FAFAFF] p-4">
                    <p className="text-sm text-slate-500">Provider Type</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {food.provider_type}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ৳{food.price}
                    </p>
                  </div>

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
                    className="px-6 py-3 border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedFoods.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold text-slate-900 mb-4">
      Related Foods
    </h2>

    <div className="grid md:grid-cols-3 gap-4">
      {relatedFoods.map((item) => (
        <Link
          to={`/foods/${item.id}`}
          key={item.id}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-sm transition"
        >
          <img
            src={item.image_url || "https://via.placeholder.com/300"}
            className="w-full h-32 object-cover"
          />

          <div className="p-3">
            <p className="text-sm font-medium text-slate-800">
              {item.title}
            </p>
            <p className="text-xs text-slate-500">
              ৳{item.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
    </MainLayout>
  );
  
}

export default FoodDetails;
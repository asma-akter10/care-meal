import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import type { Food } from "../../types/food";

function FoodCard({ food }: { food: Food }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <img
        src={food.image_url || "https://via.placeholder.com/400x300?text=Food"}
        alt={food.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900">{food.title}</p>
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

        <div className="mt-3 space-y-1 text-sm text-slate-500">
          <p>
            <span className="font-medium text-slate-700">Category:</span>{" "}
            {food.diet_type}
          </p>
          <p>
            <span className="font-medium text-slate-700">Useful for:</span>{" "}
            {food.disease_tag || "General wellness"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-purple-600 font-semibold text-lg">
            ৳{food.price}
          </span>

          <div className="flex gap-2">
            <Link
              to={`/foods/${food.id}`}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-full text-sm"
            >
              Details
            </Link>

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
    </div>
  );
}

export default FoodCard;
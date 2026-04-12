import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import type { Food } from "../../types/food";

function FoodCard({ food }: { food: Food }) {
  const { addToCart } = useCart();

  return (
    <div className="card bg-base-200 shadow-md">
      <figure>
        <img
          src={food.image_url || "/images/placeholder-food.jpg"}
          alt={food.title}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{food.title}</h2>
        <p>{food.description || "Healthy meal for your diet plan."}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="badge badge-outline">{food.diet_type}</div>
          {food.calories ? <div className="badge badge-outline">{food.calories} cal</div> : null}
        </div>
        <p className="font-semibold text-lg">৳{food.price}</p>

        <div className="card-actions justify-end">
          <Link to={`/foods/${food.id}`} className="btn btn-outline btn-sm">
            Details
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              addToCart({
                id: food.id,
                title: food.title,
                price: food.price,
                image_url: food.image_url,
                diet_type: food.diet_type,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
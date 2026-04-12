import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getFoodById } from "../../services/foodService";
import { useCart } from "../../hooks/useCart";
import type { Food } from "../../types/food";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        if (!id) return;
        const data = await getFoodById(Number(id));
        setFood(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!food) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="alert">
            <span>Food not found.</span>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={food.image_url || "/images/placeholder-food.jpg"}
            alt={food.title}
            className="w-full h-[350px] object-cover rounded-xl shadow"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{food.title}</h1>
            <p className="mb-4 text-base-content/80">
              {food.description || "Healthy meal item."}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-outline">{food.diet_type}</div>
              {food.calories ? (
                <div className="badge badge-outline">{food.calories} cal</div>
              ) : null}
            </div>

            <p className="text-2xl font-bold mb-6">৳{food.price}</p>

            <button
              className="btn btn-primary"
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
    </MainLayout>
  );
}

export default FoodDetails;
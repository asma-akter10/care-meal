import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { createFood } from "../../services/foodService";

function AddFood() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    calories: "",
    diet_type: "",
    disease_tag: "",
    image_url: "",
    rating: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFood({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        calories: form.calories ? Number(form.calories) : undefined,
        diet_type: form.diet_type.trim(),
        disease_tag: form.disease_tag,
        image_url: form.image_url,
        rating: form.rating ? Number(form.rating) : 0,
      });

      alert("Food added successfully");
      navigate("/homemaker/foods");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to add food");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Add Food</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Food Title"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              type="number"
              placeholder="Calories"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
            />

            <input
              type="text"
              placeholder="Category (e.g. Diabetic, Keto, Low Carb)"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.diet_type}
              onChange={(e) => setForm({ ...form, diet_type: e.target.value })}
            />

            <input
              type="text"
              placeholder="Useful for / Disease Tag"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.disease_tag}
              onChange={(e) => setForm({ ...form, disease_tag: e.target.value })}
            />

            <input
              type="text"
              placeholder="Image URL"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />

            <input
              type="number"
              step="0.1"
              placeholder="Rating (e.g. 4.5)"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />

            <button
              type="submit"
              className="w-full border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
            >
              Add Food
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddFood;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";
// import { createFood } from "../../services/foodService";

// function AddFood() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     calories: "",
//     diet_type: "",
//     disease_tag: "",
//     image_url: "",
//     rating: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await createFood({
//         title: form.title,
//         description: form.description,
//         price: Number(form.price),
//         calories: form.calories ? Number(form.calories) : undefined,
//         diet_type: form.diet_type,
//         disease_tag: form.disease_tag,
//         image_url: form.image_url,
//         rating: form.rating ? Number(form.rating) : 0,
//       });

//       alert("Food added successfully");
//       navigate("/homemaker/foods");
//     } catch (error: any) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to add food");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
//         <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//           <h1 className="text-2xl font-bold text-slate-900 mb-6">Add Food</h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Food Title"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <textarea
//               placeholder="Description"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               rows={3}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />

//             <input
//               type="number"
//               placeholder="Price"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//             />

//             <input
//               type="number"
//               placeholder="Calories"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.calories}
//               onChange={(e) => setForm({ ...form, calories: e.target.value })}
//             />

//             <select
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.diet_type}
//               onChange={(e) => setForm({ ...form, diet_type: e.target.value })}
//             >
//               <option value="">Select Diet Type</option>
//               <option value="DIABETIC">DIABETIC</option>
//               <option value="LOW_SALT">LOW_SALT</option>
//               <option value="LOW_FAT">LOW_FAT</option>
//               <option value="HIGH_PROTEIN">HIGH_PROTEIN</option>
//               <option value="HEALTHY">HEALTHY</option>
//               <option value="GENERAL">GENERAL</option>
//             </select>

//             <input
//               type="text"
//               placeholder="Disease Tag"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.disease_tag}
//               onChange={(e) => setForm({ ...form, disease_tag: e.target.value })}
//             />

//             <input
//               type="text"
//               placeholder="Image URL"
//               className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//               value={form.image_url}
//               onChange={(e) => setForm({ ...form, image_url: e.target.value })}
//             />

//             <input
//   type="number"
//   step="0.1"
//   placeholder="Rating (e.g. 4.5)"
//   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
//   value={form.rating}
//   onChange={(e) => setForm({ ...form, rating: e.target.value })}
// />

//             <button
//               type="submit"
//               className="w-full border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
//             >
//               Add Food
//             </button>
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// export default AddFood;
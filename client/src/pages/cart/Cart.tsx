import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../services/orderService";

function Cart() {
  const { items, totalAmount, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!deliveryAddress.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      await createOrder({
        items,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        note,
      });

      clearCart();
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Order failed");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Your Cart</h2>

          {items.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-4"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">
                        ৳{item.price} × {item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm text-slate-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none"
                  placeholder="Enter delivery address"
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-slate-700 mb-2">
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none"
                  placeholder="Optional note"
                  rows={2}
                />
              </div>

              <div className="border-t pt-4 mt-6 flex justify-between font-semibold text-slate-900">
                <span>Total</span>
                <span className="text-purple-600">৳{totalAmount}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
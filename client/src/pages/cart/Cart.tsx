import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../services/orderService";
import toast from "react-hot-toast";
import bkashLogo from "../../assets/payment/bkash.png";
import nagadLogo from "../../assets/payment/nagad.png";

type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

function Cart() {
  const { items, totalAmount, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [loading, setLoading] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState("");
  const [paymentPin, setPaymentPin] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const isOnlinePayment = paymentMethod !== "cod";

  const resetPaymentFields = () => {
    setPaymentPhone("");
    setPaymentPin("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
  };

  const placeOrder = async (transactionId: string | null) => {
    try {
      setLoading(true);

      await createOrder({
        items,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        note,
        payment_method: paymentMethod,
        transaction_id: transactionId,
      });

      clearCart();
      setShowPaymentModal(false);
      resetPaymentFields();

      toast.success(
        isOnlinePayment
          ? "Payment successful and order placed"
          : "Order placed successfully"
      );

      navigate("/orders");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    if (paymentMethod === "cod") {
      await placeOrder(null);
      return;
    }

    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      if (!paymentPhone.trim()) {
        toast.error("Please enter payment number");
        return;
      }

      if (!paymentPin.trim()) {
        toast.error("Please enter PIN");
        return;
      }
    }

    if (paymentMethod === "card") {
      if (
        !cardNumber.trim() ||
        !cardName.trim() ||
        !cardExpiry.trim() ||
        !cardCvv.trim()
      ) {
        toast.error("Please complete card details");
        return;
      }
    }

    const transactionId = `TXN-${Date.now()}`;
    await placeOrder(transactionId);
  };

  const paymentTheme = {
    bkash: {
      title: "bKash Payment",
      accentText: "text-pink-600",
      accentBg: "bg-pink-50",
      accentBorder: "border-pink-200",
      button: "border-pink-600 text-pink-600 hover:bg-pink-50",
      pill: "bg-pink-100 text-pink-600",
      logo: bkashLogo,
    },
    nagad: {
      title: "Nagad Payment",
      accentText: "text-orange-600",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-200",
      button: "border-orange-600 text-orange-600 hover:bg-orange-50",
      pill: "bg-orange-100 text-orange-600",
      logo: nagadLogo,
    },
    card: {
      title: "Card Payment",
      accentText: "text-blue-600",
      accentBg: "bg-blue-50",
      accentBorder: "border-blue-200",
      button: "border-blue-600 text-blue-600 hover:bg-blue-50",
      pill: "bg-blue-100 text-blue-600",
      logo: null,
    },
  };

  const currentTheme =
    paymentMethod === "bkash"
      ? paymentTheme.bkash
      : paymentMethod === "nagad"
      ? paymentTheme.nagad
      : paymentTheme.card;

  return (
    <MainLayout>
      <div className="bg-[#FAFAFF] min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Checkout
            </h1>
            <p className="mt-2 text-slate-500">
              Review your items, choose a payment method, and place your order.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
              <p className="mt-2 text-slate-500">
                Add some healthy meals to continue.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Cart Items
                    </h2>
                    <span className="text-sm text-slate-500">
                      {items.length} item{items.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={
                              item.image_url ||
                              "https://via.placeholder.com/100x100?text=Food"
                            }
                            alt={item.title}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
                          />

                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              {item.diet_type}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              ৳{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-5">
                    Delivery Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-purple-300"
                        placeholder="Enter full delivery address"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Note
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-purple-300"
                        placeholder="Any extra instructions (optional)"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        Payment Method
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Select how you want to pay
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                      {paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : paymentMethod === "bkash"
                        ? "bKash"
                        : paymentMethod === "nagad"
                        ? "Nagad"
                        : "Card"}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`group rounded-3xl border p-5 text-left transition-all ${
                        paymentMethod === "cod"
                          ? "border-purple-600 bg-purple-50 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-xl">
                        💵
                      </div>
                      <p className="mt-4 font-semibold text-slate-900">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Pay after the rider delivers your order
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bkash")}
                      className={`group rounded-3xl border p-5 text-left transition-all ${
                        paymentMethod === "bkash"
                          ? "border-pink-500 bg-pink-50 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={bkashLogo}
                          alt="bKash"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <p className="mt-4 font-semibold text-slate-900">bKash</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Mobile payment with instant confirmation
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("nagad")}
                      className={`group rounded-3xl border p-5 text-left transition-all ${
                        paymentMethod === "nagad"
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={nagadLogo}
                          alt="Nagad"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <p className="mt-4 font-semibold text-slate-900">Nagad</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Fast mobile wallet payment experience
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`group rounded-3xl border p-5 text-left transition-all ${
                        paymentMethod === "card"
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">
                        💳
                      </div>
                      <p className="mt-4 font-semibold text-slate-900">Card</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Visa, MasterCard, or other debit/credit cards
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Order Summary
                  </h2>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Items</span>
                      <span>{items.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Payment</span>
                      <span>
                        {paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : paymentMethod === "bkash"
                          ? "bKash"
                          : paymentMethod === "nagad"
                          ? "Nagad"
                          : "Card"}
                      </span>
                    </div>

                    <div className="h-px bg-slate-200" />

                    <div className="flex items-center justify-between">
                      <span className="text-slate-900 font-medium">Total</span>
                      <span className="text-2xl font-bold text-purple-600">
                        ৳{totalAmount}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full mt-6 rounded-2xl bg-purple-600 text-white py-3.5 font-medium hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {loading
                      ? "Processing..."
                      : isOnlinePayment
                      ? "Continue to Payment"
                      : "Place Order"}
                  </button>

                  <p className="mt-3 text-xs leading-5 text-slate-400 text-center">
                    Your order will be confirmed after checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/35 backdrop-blur-sm flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md bg-white rounded-[32px] border border-slate-200 shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    currentTheme.pill
                  }`}
                >
                  {paymentMethod === "bkash" && (
                    <img
                      src={bkashLogo}
                      alt="bKash"
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {paymentMethod === "nagad" && (
                    <img
                      src={nagadLogo}
                      alt="Nagad"
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {paymentMethod === "card" && <span>💳</span>}
                  <span>
                    {paymentMethod === "bkash"
                      ? "bKash"
                      : paymentMethod === "nagad"
                      ? "Nagad"
                      : "Card"}
                  </span>
                </div>

                <h3 className={`mt-4 text-2xl font-bold ${currentTheme.accentText}`}>
                  {currentTheme.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Secure demo payment form for your project showcase
                </p>
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-9 h-9 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition"
              >
                ✕
              </button>
            </div>

            <div
              className={`mt-6 rounded-3xl border p-4 ${currentTheme.accentBg} ${currentTheme.accentBorder}`}
            >
              <p className="text-sm text-slate-500">Amount to pay</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                ৳{totalAmount}
              </p>
            </div>

            {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder={`${paymentMethod === "bkash" ? "bKash" : "Nagad"} Number`}
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                />

                <input
                  type="password"
                  placeholder="PIN"
                  value={paymentPin}
                  onChange={(e) => setPaymentPin(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                />

                <div
                  className={`rounded-2xl border p-4 text-sm ${currentTheme.accentBg} ${currentTheme.accentBorder}`}
                >
                  <p className="text-slate-600 leading-6">
                    This is a demo {paymentMethod === "bkash" ? "bKash" : "Nagad"} payment flow.
                    No real payment will be charged.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                />

                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:border-slate-300"
                  />
                </div>

                <div
                  className={`rounded-2xl border p-4 text-sm ${currentTheme.accentBg} ${currentTheme.accentBorder}`}
                >
                  <p className="text-slate-600 leading-6">
                    This is a demo card payment form. No real charge will be made.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 border border-slate-300 text-slate-700 rounded-2xl py-3 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={loading}
                className={`flex-1 rounded-2xl py-3 font-medium border transition disabled:opacity-50 ${currentTheme.button}`}
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Cart;
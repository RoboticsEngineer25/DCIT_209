
import { useNavigate } from "react-router";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white  rounded-2xl p-6 text-center max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <span className="text-green-500 text-3xl">✔</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Your order has been placed successfully.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
        >
          Continue Shopping
          </button>
    </div>
    </div>
  );
}

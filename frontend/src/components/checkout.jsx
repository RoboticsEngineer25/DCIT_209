import React from "react";

const CheckoutForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Customer Details */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Customer Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="**** **** **** ****"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="***"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">$26.98</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$5.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$6.40</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-medium text-gray-900">$39.37</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => (window.location.href = "Cart.html")}
                className="w-auto bg-green-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Return
              </button>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

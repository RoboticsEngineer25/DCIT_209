import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import Context from "../context/context.jsx";

const SignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    gender,
    setGender,
    birthDate,
    setBirthDate,
  } = useContext(Context);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Something went wrong");
      return result;
    },
    onError: (error) => console.error("Signup error:", error.message),
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="images/logo.jpg"
            alt="sphinx logo"
            className="h-20 w-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Account Information
            </h3>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="news"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="news" className="ml-2 text-sm text-gray-600">
                Receive Newsletters?
              </label>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="2pword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="2pword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name (Optional)
                </label>
                <input
                  type="text"
                  id="lname"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="telpre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prefix
                </label>
                <select
                  id="telpre"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="+233">+233</option>
                  <option value="+1">+1</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="telno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="telno"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  max={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setGender(e.target.value.toLowerCase())}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="bdate"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="bdate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                id="tnc"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="tnc" className="ml-2 text-sm text-gray-600">
                I agree to all{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="button"
              onClick={() =>
                mutation.mutate({
                  email,
                  firstName,
                  lastName,
                  password,
                  phoneNumber,
                  gender,
                  birthDate,
                })
              }
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContextProvider";
import GoogleOAuth from "./GoogleOAuth";

const Signup = () => {

  const { setSignupState, saveUser } = useContext(authContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(formData);
    setSignupState(false)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 border border-green-200 w-96 max-w-[90%] animate-fadeIn relative z-50">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">Sign Up</h2>
        <GoogleOAuth />
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
            required
          />
          <button
            type="submit"
            className="w-full border border-green-700 text-green-800 py-3 text-sm font-medium hover:bg-green-700 hover:text-white transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => setSignupState(false)}
          className="mt-3 border border-green-300 py-3 w-full text-gray-700 hover:text-green-700 transition-colors cursor-pointer text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Signup;

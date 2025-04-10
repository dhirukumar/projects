import React, { useState } from "react";
import axios from "axios";
import { URL } from "./backendurl";
import { useNavigate } from "react-router-dom";

export  function Signin() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
   
    // Add fetch/axios POST call here
    try {
        const response = await axios.post(`${URL}/signin`, { email, password });
        const token=response.data.token; 
        localStorage.setItem("token",token);
        navigate("/dashboard");
        alert("Signin successful!");
      } catch (error) {
        alert("Signin failed. Please try again.");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signin</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
           value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition" >
            Sign In
              </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
       <a href="/signup" className="text-blue-600 hover:underline">
         Register
         </a>
         </p> </div>
    </div>
  );
}

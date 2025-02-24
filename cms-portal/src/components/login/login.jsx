"use client";  // Required in Next.js App Router (if using Next.js 13+)
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (data.message === "Login successful") {
        router.push("/upload"); 
      } else {
        setError(data.message); 
      }
    } catch {
      setError("Something went wrong!");
    }
  };
  

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">CMS Portal</h2>
          <p className="text-gray-500 text-sm">Secure Login to Continue</p>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
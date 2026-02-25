import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { useState } from "react";

export default function Register() {
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/chat");
    } catch (err) {
      console.log("register failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Register
        </button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
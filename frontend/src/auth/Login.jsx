import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "./AuthContext";
import AuthSplitLayout from "../layouts/AuthSplitLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);

      const role = JSON.parse(atob(res.data.token.split(".")[1])).role;
      navigate(
        role === "ADMIN"
          ? "/admin"
          : role === "INTERVIEWER"
          ? "/interviewer"
          : "/candidate"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="User Login"
      subtitle="Sign in to continue"
    >
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="relative mb-5">
        <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
        <input
          type={showPwd ? "text" : "password"}
          placeholder="Password"
          className="w-full border rounded pl-10 pr-12 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          className="absolute right-3 top-2 text-sm text-gray-500"
        >
          {showPwd ? "Hide" : "Show"}
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500
          text-white py-2 rounded font-medium hover:opacity-90 transition
          disabled:opacity-60"
      >
        {loading ? "Logging in…" : "Login"}
      </button>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          className="text-purple-600 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </AuthSplitLayout>
  );
}

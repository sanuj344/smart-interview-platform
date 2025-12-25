import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "./AuthContext";
import AuthSplitLayout from "../layouts/AuthSplitLayout";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------- PASSWORD STRENGTH LOGIC --------
  const getStrength = () => {
    if (password.length === 0) return { level: 0, label: "" };

    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (password.length < 8) {
      return { level: 1, label: "Weak", color: "bg-red-500" };
    }

    if (password.length >= 8 && !hasNumber) {
      return { level: 2, label: "Medium", color: "bg-yellow-500" };
    }

    if (password.length >= 8 && hasNumber && !hasSpecial) {
      return { level: 3, label: "Strong", color: "bg-blue-500" };
    }

    return { level: 4, label: "Very Strong", color: "bg-green-500" };
  };

  const strength = getStrength();
  const isPasswordValid = strength.level >= 2;

  // -------- SIGNUP HANDLER --------
  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      login(res.data.token);
      navigate(
        role === "ADMIN"
          ? "/admin"
          : role === "INTERVIEWER"
          ? "/interviewer"
          : "/candidate"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="Create Account"
      subtitle="Get started in seconds"
    >
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
          {error}
        </div>
      )}

      <input
        placeholder="Full name"
        className="w-full border rounded px-3 py-2 mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded px-3 py-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD INPUT */}
      <div className="relative mb-1">
        <input
          type={showPwd ? "text" : "password"}
          placeholder="Password"
          className={`w-full border rounded px-3 py-2 pr-12
            ${password && !isPasswordValid ? "border-red-500" : ""}
            focus:outline-none focus:ring-2 focus:ring-purple-400`}
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

      {/* STRENGTH BAR */}
      {password && (
        <>
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-1">
            <div
              className={`h-full ${strength.color}`}
              style={{ width: `${strength.level * 25}%` }}
            />
          </div>
          <p
            className={`text-xs mb-3 ${
              strength.level <= 1
                ? "text-red-500"
                : strength.level === 2
                ? "text-yellow-600"
                : strength.level === 3
                ? "text-blue-600"
                : "text-green-600"
            }`}
          >
            Password strength: {strength.label}
          </p>
        </>
      )}

      <select
        className="w-full border rounded px-3 py-2 mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="CANDIDATE">Candidate</option>
        <option value="INTERVIEWER">Interviewer</option>
        <option value="ADMIN">Admin (demo)</option>
      </select>

      <button
        onClick={handleSignup}
        disabled={loading || !isPasswordValid}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500
          text-white py-2 rounded font-medium hover:opacity-90 transition
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span
          className="text-purple-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </AuthSplitLayout>
  );
}

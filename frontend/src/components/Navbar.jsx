import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  if (!auth) return null;

  const goHome = () => {
    if (auth.role === "CANDIDATE") navigate("/candidate");
    else if (auth.role === "INTERVIEWER") navigate("/interviewer");
    else if (auth.role === "ADMIN") navigate("/admin");
  };

  return (
    <div className="w-full bg-white border-b px-6 py-3 flex justify-between items-center">
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={goHome}
      >
        Interview Platform
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Role: {auth.role}
        </span>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

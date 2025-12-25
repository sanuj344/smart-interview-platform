import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => {
            if (auth.role === "CANDIDATE") navigate("/candidate");
            if (auth.role === "INTERVIEWER") navigate("/interviewer");
            if (auth.role === "ADMIN") navigate("/admin");
          }}
          className="text-lg font-semibold cursor-pointer"
        >
          Interview Platform
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {auth.role}
          </span>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}

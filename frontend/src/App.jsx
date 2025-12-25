import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";



import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* CANDIDATE */}
          <Route
            path="/candidate"
            element={
              <ProtectedRoute roles={["CANDIDATE"]}>
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />

          {/* INTERVIEWER */}
          <Route
            path="/interviewer"
            element={
              <ProtectedRoute roles={["INTERVIEWER"]}>
                <InterviewerDashboard />
              </ProtectedRoute>
            }
          />

         

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

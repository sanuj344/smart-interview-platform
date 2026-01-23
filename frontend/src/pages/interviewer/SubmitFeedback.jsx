import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import AppLayout from "../../layouts/AppLayout";
import Toast from "../../components/Toast";

export default function SubmitFeedback() {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [techScore, setTechScore] = useState(5);
  const [commScore, setCommScore] = useState(5);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const submit = async () => {
    setError("");

    if (!techScore || !commScore) {
      setError("Scores are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/feedback", {
        interviewId: Number(interviewId),
        techScore,
        commScore,
        notes,
      });

      setToast({
        message: "Feedback submitted successfully! The candidate has been notified via email.",
        type: "success"
      });

      // Navigate after a short delay to show the toast
      setTimeout(() => {
        navigate("/interviewer");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">
          Submit Interview Feedback
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          The candidate will be notified by email once you submit the feedback.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tech Score */}
        <label className="block mb-2 font-medium">
          Technical Score: {techScore}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={techScore}
          onChange={(e) => setTechScore(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* Communication Score */}
        <label className="block mb-2 font-medium">
          Communication Score: {commScore}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={commScore}
          onChange={(e) => setCommScore(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* Notes */}
        <label className="block mb-2 font-medium">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded p-2 mb-6"
          rows={4}
          placeholder="Strengths, concerns, overall impression..."
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </AppLayout>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AppLayout from "../../layouts/AppLayout";

export default function InterviewerDashboard() {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const s = await api.get("/slots/mine");
      const i = await api.get("/interviews/mine");
      setSlots(s.data || []);
      setInterviews(i.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createSlot = async () => {
    if (!startTime || !endTime) {
      alert("Please select start and end time");
      return;
    }

    try {
      await api.post("/slots", { startTime, endTime });
      setStartTime("");
      setEndTime("");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create slot");
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Interviewer Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage availability and interviews
        </p>
      </div>

      {/* Create Slot */}
      <section className="bg-white rounded shadow p-6 mb-8">
        <h2 className="font-semibold mb-4">Create Slot</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={createSlot}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Slot
          </button>
        </div>
      </section>

      {/* Slots */}
      <section className="mb-10">
        <h2 className="font-semibold mb-3">My Slots</h2>

        {slots.length === 0 && (
          <p className="text-gray-600">No slots created yet</p>
        )}

        <div className="space-y-2">
          {slots.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded shadow text-sm flex justify-between"
            >
              <span>
                {new Date(s.startTime).toLocaleString()} →{" "}
                {new Date(s.endTime).toLocaleString()}
              </span>
              <span
                className={`font-medium ${
                  s.isBooked ? "text-red-600" : "text-green-600"
                }`}
              >
                {s.isBooked ? "Booked" : "Available"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Interviews */}
      <section>
        <h2 className="font-semibold mb-3">My Interviews</h2>

        {loading && <p className="text-gray-600">Loading interviews…</p>}

        {!loading && interviews.length === 0 && (
          <p className="text-gray-600">No interviews yet</p>
        )}

        <div className="space-y-4">
          {interviews.map((i) => (
            <div
              key={i.id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  Candidate: {i.candidate.name}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(i.slot.startTime).toLocaleString()}
                </p>
              </div>

              {i.status !== "COMPLETED" ? (
                <button
                  onClick={() =>
                    navigate(`/interviewer/feedback/${i.id}`)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Feedback
                </button>
              ) : (
                <span className="text-sm text-green-600 font-medium">
                  Feedback Submitted
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

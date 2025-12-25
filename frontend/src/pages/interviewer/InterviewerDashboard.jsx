import { useEffect, useState } from "react";
import api from "../../api/api";
import AppLayout from "../../layouts/AppLayout";

export default function InterviewerDashboard() {
  const [slots, setSlots] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await api.get("/slots/mine");
    const i = await api.get("/interviews/mine");
    setSlots(s.data || []);
    setInterviews(i.data || []);
  };

  const createSlot = async () => {
    try {
      await api.post("/slots", { startTime, endTime });
      setStartTime("");
      setEndTime("");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create slot");
    }
  };

  const submitFeedback = async (interviewId) => {
    const tech = prompt("Tech score (1–10)");
    const comm = prompt("Comm score (1–10)");
    const notes = prompt("Notes");

    if (!tech || !comm) return;

    await api.post("/feedback", {
      interviewId,
      techScore: Number(tech),
      commScore: Number(comm),
      notes,
    });

    loadData();
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
        <div className="flex gap-4">
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
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Slot
          </button>
        </div>
      </section>

      {/* Slots */}
      <section className="mb-10">
        <h2 className="font-semibold mb-3">My Slots</h2>
        <div className="space-y-2">
          {slots.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded shadow text-sm"
            >
              {new Date(s.startTime).toLocaleString()} →{" "}
              {new Date(s.endTime).toLocaleString()} |{" "}
              {s.isBooked ? "Booked" : "Available"}
            </div>
          ))}
        </div>
      </section>

      {/* Interviews */}
      <section>
        <h2 className="font-semibold mb-3">My Interviews</h2>

        {interviews.length === 0 && (
          <p className="text-gray-600">No interviews yet</p>
        )}

        <div className="space-y-4">
          {interviews.map((i) => (
            <div
              key={i.id}
              className="bg-white p-5 rounded shadow"
            >
              <p className="font-medium">
                Candidate: {i.candidate.name}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(i.slot.startTime).toLocaleString()}
              </p>

              {i.status !== "COMPLETED" && (
                <button
                  onClick={() => submitFeedback(i.id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit Feedback
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

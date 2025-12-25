import { useEffect, useState } from "react";
import api from "../../api/api";

export default function CandidateDashboard() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/slots/available");
      setSlots(res.data);
    } catch (err) {
      setError("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slotId) => {
    try {
      await api.post("/interviews/book", {
        slotId,
        roundType: "Technical",
      });
      alert("Interview booked successfully");
      fetchSlots(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading slots...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Interview Slots</h2>

      {slots.length === 0 && (
        <p className="text-gray-600">No slots available</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="border rounded p-4 shadow-sm bg-white"
          >
            <p>
              <strong>Start:</strong>{" "}
              {new Date(slot.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {new Date(slot.endTime).toLocaleString()}
            </p>

            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => bookSlot(slot.id)}
            >
              Book Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

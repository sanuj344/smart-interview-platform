import { useEffect, useState } from "react";
import api from "../../api/api";
import AppLayout from "../../layouts/AppLayout";
import Toast from "../../components/Toast";

export default function CandidateDashboard() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await api.get("/slots/available");
      setSlots(res.data || []);
    } catch {
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
      setToast({
        message: "Interview booked successfully! A confirmation email has been sent to you.",
        type: "success"
      });
      fetchSlots();
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Booking failed",
        type: "error"
      });
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Book an Interview</h1>
        <p className="text-gray-600 mt-1">
          Select an available time slot. You will receive a confirmation email after booking.
        </p>
      </div>

      {/* Content */}
      {loading && <p>Loading slots…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && slots.length === 0 && (
        <p className="text-gray-600">No slots available right now</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white rounded shadow p-5"
          >
            <p className="text-gray-800 font-medium">
              {new Date(slot.startTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Ends at {new Date(slot.endTime).toLocaleString()}
            </p>

            <button
              onClick={() => bookSlot(slot.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book Interview
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

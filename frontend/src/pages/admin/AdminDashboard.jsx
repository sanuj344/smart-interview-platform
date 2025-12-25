import { useEffect, useState } from "react";
import api from "../../api/api";
import AppLayout from "../../layouts/AppLayout";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    scheduled: 0,
    avgTech: 0,
    avgComm: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Analytics
      const a = await api.get("/admin/analytics");
      setStats({
        total: a.data.total ?? 0,
        completed: a.data.completed ?? 0,
        scheduled: a.data.scheduled ?? 0,
        avgTech: a.data.avgTech ?? 0,
        avgComm: a.data.avgComm ?? 0,
      });

      // Recent feedback (only if endpoint exists)
      try {
        const r = await api.get("/admin/feedback");
        setRecent(r.data || []);
      } catch {
        setRecent([]);
      }

    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <p className="text-gray-600">Loading analytics…</p>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <p className="text-red-600">{error}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Admin Analytics</h1>
        <p className="text-gray-600 mt-1">
          System-wide interview insights
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <KPI title="Total Interviews" value={stats.total} />
        <KPI title="Completed Interviews" value={stats.completed} />
        <KPI title="Scheduled Interviews" value={stats.scheduled} />
        <KPI title="Avg Tech Score" value={stats.avgTech.toFixed(1)} />
        <KPI title="Avg Comm Score" value={stats.avgComm.toFixed(1)} />
      </div>

      {/* RECENT FEEDBACK */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Feedback
        </h2>

        {recent.length === 0 ? (
          <p className="text-gray-600">No feedback available</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3">Interview</th>
                <th className="p-3">Tech</th>
                <th className="p-3">Comm</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="p-3">#{f.interviewId}</td>
                  <td className="p-3">{f.techScore}</td>
                  <td className="p-3">{f.commScore}</td>
                  <td className="p-3 text-gray-700">
                    {f.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppLayout>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

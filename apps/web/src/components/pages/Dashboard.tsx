import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <Link
          to="/chat"
          className="inline-block bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition"
        >
          Go to Chat
        </Link>
      </div>
    </div>
  );
}
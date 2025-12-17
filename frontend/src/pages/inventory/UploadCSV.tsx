import { useState } from "react";
import { uploadCSV } from "../../api/inventory.api";
import { useNavigate } from "react-router-dom";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    try {
      setLoading(true);
      await uploadCSV(file);
      alert("CSV uploaded successfully");
      navigate("/"); // ✅ go back to dashboard
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Upload Inventory CSV
        </h2>

        <input
          type="file"
          accept=".csv"
          className="block w-full border p-2 rounded mb-4"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          CSV will update inventory quantities in bulk
        </p>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.api";
import { getCategories } from "../../api/category.api";
import { getInventory } from "../../api/inventory.api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    inventory: 0,
  });

  // 🔐 Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 📊 Load dashboard stats
  useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories(),
      getInventory(),
    ]).then(([p, c, i]) => {
      setCounts({
        products: p.data.length,
        categories: c.data.length,
        inventory: i.data.length,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link
          to="/products"
          className="bg-white p-4 rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-2xl font-bold mt-2">{counts.products}</p>
        </Link>

        <Link
          to="/categories"
          className="bg-white p-4 rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-2xl font-bold mt-2">{counts.categories}</p>
        </Link>

        <Link
          to="/inventory"
          className="bg-white p-4 rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Inventory</h2>
          <p className="text-2xl font-bold mt-2">{counts.inventory}</p>
        </Link>

        <Link
          to="/upload"
          className="bg-white p-4 rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Upload CSV</h2>
          <p className="text-sm text-gray-500 mt-2">
            Bulk inventory update
          </p>
        </Link>

      </div>
    </div>
  );
}

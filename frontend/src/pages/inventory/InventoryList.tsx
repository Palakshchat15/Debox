import { useEffect, useState } from "react";
import {
  getInventory,
  updateInventory,
  deleteInventory,
} from "../../api/inventory.api";

export default function InventoryList() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await getInventory();
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No inventory data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>

      <div className="space-y-3">
        {items.map(i => (
          <div
            key={i._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* ✅ Correct field */}
            <span className="font-medium">
              {i.productId?.name || "Unknown Product"}
            </span>

            <div className="flex items-center gap-3">
              <input
                type="number"
                defaultValue={i.quantity}
                className="border p-1 w-20 rounded"
                onBlur={e =>
                  updateInventory(i._id, {
                    quantity: Number(e.target.value),
                  }).then(load)
                }
              />

              <button
                onClick={() => deleteInventory(i._id).then(load)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

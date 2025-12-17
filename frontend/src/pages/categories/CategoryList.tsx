import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/category.api";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name) return;
    await createCategory({ name });
    setName("");
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="New category"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4" onClick={add}>
          Add
        </button>
      </div>

      {categories.map(c => (
        <div key={c._id} className="bg-white p-3 mb-2 flex justify-between">
          {c.name}
          <button
            className="bg-red-600 text-white px-3"
            onClick={() => deleteCategory(c._id).then(load)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

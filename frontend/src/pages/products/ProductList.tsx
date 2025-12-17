import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/product.api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  const load = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>

        <Link
          to="/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      {products.map(p => (
        <div
          key={p._id}
          className="bg-white p-3 mb-2 flex justify-between items-center"
        >
          {p.name}
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => deleteProduct(p._id).then(load)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

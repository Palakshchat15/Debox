import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/product.api";
import { getCategories } from "../../api/category.api";

export default function AddProduct() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    // load categories for dropdown
    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
    }, []);

    const submit = async () => {
        if (!name || !price || !category) {
            alert("All fields are required");
            return;
        }

        console.log("Before API call");
        await createProduct({ name, price: Number(price), category });
        console.log("After API call");
        navigate("/products");

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Product name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <select
                    className="border p-2 w-full mb-4"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={submit}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}

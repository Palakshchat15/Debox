import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProductList";
import CategoryList from "../pages/categories/CategoryList";
import InventoryList from "../pages/inventory/InventoryList";
import UploadCSV from "../pages/inventory/UploadCSV";
import ProtectedRoute from "../auth/ProtectedRoute";
import AddProduct from "../pages/products/AddProduct";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>}/>
      <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryList /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadCSV /></ProtectedRoute>} />
    </Routes>
  );
}

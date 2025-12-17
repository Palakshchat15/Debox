import api from "./axios";

export const getProducts = () => api.get("/products");
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const createProduct = (data: {
  name: string;
  price: number;
  category: string;
}) => api.post("/products", data);
export const updateProduct = (id: string, data: any) =>
  api.put(`/products/${id}`, data);
export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`);

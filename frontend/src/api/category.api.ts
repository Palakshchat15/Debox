import api from "./axios";

export const getCategories = () => api.get("/categories");
export const createCategory = (data: any) => api.post("/categories", data);
export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`);

import api from "./axios";

export const getInventory = () => api.get("/inventory");
export const updateInventory = (id: string, data: any) =>
  api.put(`/inventory/${id}`, data);
export const deleteInventory = (id: string) =>
  api.delete(`/inventory/${id}`);

export const uploadCSV = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/inventory/upload", formData);
};

import api from "./axios";

export const loginApi = (data: any) =>
  api.post("/auth/login", data);

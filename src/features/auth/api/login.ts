import { axios } from "@/lib/axios";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<any> => {
  return axios.post("/auth/login", data);
};

export const API_URL =
  import.meta.env.MODE === "production"
    ? "http://localhost:8000"
    : "http://localhost:8000";
export const JWT_SECRET = "12345" as string;

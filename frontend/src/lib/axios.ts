import axios from "axios";

// Create Axios instance
export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// Add request interceptor (only in client-side code)
if (typeof window !== "undefined") {
   api.interceptors.request.use(
      (config) => {
         const token = localStorage.getItem("authToken");
         if (token) {
            config.headers["Authorization"] = token;
         }
         return config;
      },
      (error) => Promise.reject(error)
   );
}

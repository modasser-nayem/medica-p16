import { api } from "@/lib/axios";

export const userService = {
   getAllUSers: () => api.get("/users"),
};

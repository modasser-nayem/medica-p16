"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/slice/authSlice";
import { authApi } from "@/redux/api/auth";

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const { data } = authApi.useGetMeQuery();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (data?.data) dispatch(setUser(data.data));
   }, [data, dispatch]);

   return <>{children}</>;
}

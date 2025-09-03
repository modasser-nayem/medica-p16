"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/slice/authSlice";
import { authApi } from "@/redux/api/auth";
import Loading from "@/components/ui/loading";

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const { data, isLoading } = authApi.useGetMeQuery();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (data?.data) dispatch(setUser(data.data));
   }, [data, dispatch]);

   if (isLoading) return <Loading fullScreen />;

   return <>{children}</>;
}

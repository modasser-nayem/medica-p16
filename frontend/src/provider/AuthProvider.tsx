"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/slice/authSlice";
import { authApi } from "@/redux/api/auth";
import Loading from "@/components/ui/loading";
import ErrorState from "@/components/shared/ErrorState";

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const { data, isLoading, isError, refetch } = authApi.useGetMeQuery();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (data?.data) dispatch(setUser(data.data));
   }, [data, dispatch]);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load fees"
            description="There was a problem fetching consultation fees."
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   return <>{children}</>;
}

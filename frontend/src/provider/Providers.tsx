"use client";

import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";
import { PersistGate } from "redux-persist/integration/react";
import StripeProvider from "./StripeProvider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return (
      <Provider store={store}>
         <PersistGate
            loading={null}
            persistor={persistor}
         >
            <AuthProvider>
               <StripeProvider>{children}</StripeProvider>
            </AuthProvider>
         </PersistGate>
      </Provider>
   );
};

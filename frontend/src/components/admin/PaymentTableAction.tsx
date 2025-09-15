"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { paymentApi } from "@/redux/api/payment";
import { IPayment } from "@/types";

const PaymentTableAction = ({ data }: { data: IPayment }) => {
   const [retryPayProcess, { isLoading }] =
      paymentApi.useRetryPaymentProcessMutation();

   const disabledRetry =
      data.status === "COMPLETED" || data.status === "REFUNDED";

   return (
      <>
         <Button
            size="sm"
            variant="default"
            disabled={disabledRetry || isLoading}
            onClick={() => retryPayProcess({ sessionId: data.externalId })}
         >
            <RefreshCw size={16} /> Retry
         </Button>
         {/* <Button
            size="sm"
            variant="default"
            disabled={isLoading}
         >
            <HandCoins size={16} /> Re-Payment
         </Button> */}
      </>
   );
};

export default PaymentTableAction;

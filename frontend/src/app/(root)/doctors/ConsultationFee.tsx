import { IConsultationFee } from "@/types";
import { MessageSquareMore, Minus, PhoneCall, Video } from "lucide-react";
import { useState } from "react";

export default function ConsultationFees({
   fees,
   onFeeSelect,
}: {
   fees: IConsultationFee[];
   onFeeSelect: (type: IConsultationFee | undefined) => void;
}) {
   const [selectedFee, setSelectedFee] = useState<string>("");

   return (
      <div className="mt-10">
         <h3 className="text-xl font-bold mb-5">Consultation Fees</h3>
         <div className="flex flex-wrap gap-4">
            {fees.map((fee) => (
               <div
                  key={fee.id}
                  className={`flex items-center px-5 py-3 rounded-md border shadow-md cursor-pointer transition 
              ${
                 selectedFee === fee.id
                    ? "bg-primary-50 border-primary-500"
                    : "bg-white border-gray-200 hover:border-primary-400 hover:bg-primary-50"
              }`}
                  onClick={() => {
                     setSelectedFee(fee.id === selectedFee ? "" : fee.id);
                     onFeeSelect(fee.id === selectedFee ? undefined : fee);
                  }}
               >
                  <input
                     type="radio"
                     name="consultationFee"
                     value={fee.id}
                     checked={selectedFee === fee.id}
                     onChange={() => setSelectedFee(fee.id)}
                     className="w-5 h-5 accent-primary-500 mr-3"
                  />
                  <div className="flex items-center gap-1">
                     <span className="uppercase font-bold flex items-center gap-2">
                        {fee.type === "CHAT" ? (
                           <MessageSquareMore size={20} />
                        ) : fee.type === "VOICE" ? (
                           <PhoneCall size={18} />
                        ) : (
                           <Video size={22} />
                        )}
                        {fee.type}
                     </span>
                     <Minus />
                     <span className="text-xl text-gray-700 font-semibold">
                        {fee.fee} <sup className="text-sm">{fee.currency}</sup>
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

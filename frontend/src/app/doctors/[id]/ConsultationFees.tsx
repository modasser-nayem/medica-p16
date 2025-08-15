import { useState } from "react";

export default function ConsultationFees() {
   const [selectedFee, setSelectedFee] = useState<number>(0);

   const fees = [
      { id: 1, type: "Video", price: 300 },
      { id: 2, type: "Chat", price: 200 },
      { id: 3, type: "Voice", price: 100 },
   ];

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
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-400"
              }`}
                  onClick={() => setSelectedFee(fee.id)}
               >
                  <input
                     type="radio"
                     name="consultationFee"
                     value={fee.id}
                     checked={selectedFee === fee.id}
                     onChange={() => setSelectedFee(fee.id)}
                     className="w-5 h-5 accent-blue-500 mr-3"
                  />
                  <div>
                     <span className="uppercase font-bold">{fee.type}</span>
                     <span className="ml-2 text-gray-700 font-semibold">
                        - {fee.price} BDT
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

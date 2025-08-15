import React from "react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   limit: number;
   setLimit: (limit: number) => void;
   onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationProps> = ({
   currentPage,
   totalPages,
   limit,
   setLimit,
   onPageChange,
}) => {
   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
         {/* Limit selector */}
         <div className="flex items-center gap-2">
            <label
               htmlFor="limit"
               className="text-sm font-medium"
            >
               Rows per page:
            </label>
            <select
               id="limit"
               value={limit}
               onChange={(e) => setLimit(Number(e.target.value))}
               className="border rounded-md px-2 py-1 text-sm"
            >
               {[1, 5, 10, 20, 50].map((size) => (
                  <option
                     key={size}
                     value={size}
                  >
                     {size}
                  </option>
               ))}
            </select>
         </div>

         {/* Page numbers */}
         <div className="flex items-center gap-2">
            <button
               disabled={currentPage === 1}
               onClick={() => onPageChange(currentPage - 1)}
               className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
               Prev
            </button>

            {pageNumbers.map((num) => (
               <button
                  key={num}
                  onClick={() => onPageChange(num)}
                  className={`px-3 py-1 border rounded-md ${
                     num === currentPage ? "bg-blue-500 text-white" : ""
                  }`}
               >
                  {num}
               </button>
            ))}

            <button
               disabled={currentPage === totalPages}
               onClick={() => onPageChange(currentPage + 1)}
               className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default PaginationBar;

import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
   limit?: number;
   onLimitChange?: (limit: number) => void;
}

export default function CustomPagination({
   currentPage,
   totalPages,
   onPageChange,
   limit,
   onLimitChange,
}: CustomPaginationProps) {
   if (totalPages <= 1) return null; // ✅ hide pagination if only 1 page

   const maxPageNumbersToShow = 5;
   const pages: number[] = [];

   // ✅ clamp the number of pages so it never exceeds totalPages
   let start = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
   let end = start + maxPageNumbersToShow - 1;

   if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPageNumbersToShow + 1);
   }

   for (let i = start; i <= end; i++) {
      pages.push(i);
   }

   return (
      <Pagination>
         <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={
                     currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
               />
            </PaginationItem>

            {/* Page Numbers */}
            {pages.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     href="#"
                     isActive={page === currentPage}
                     onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page);
                     }}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {totalPages > 5 && (
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            )}

            {/* Limit */}
            {limit && onLimitChange && (
               <PaginationItem>
                  <select
                     className="border input py-0.5 px-0.5 bg-gray-100"
                     name="limit"
                     id="limit"
                     value={limit}
                     onChange={(e) => onLimitChange(Number(e.target.value))}
                  >
                     {[5, 10, 20, 30].map((item, i) => (
                        <option
                           value={item}
                           key={i}
                        >
                           {item}
                        </option>
                     ))}
                  </select>
               </PaginationItem>
            )}

            {/* Next Button */}
            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (currentPage < totalPages)
                        onPageChange(currentPage + 1);
                  }}
                  className={
                     currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                  }
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}

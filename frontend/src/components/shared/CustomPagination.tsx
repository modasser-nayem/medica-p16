import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export default function CustomPagination({
   currentPage,
   totalPages,
   onPageChange,
}: CustomPaginationProps) {
   console.log(totalPages);
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

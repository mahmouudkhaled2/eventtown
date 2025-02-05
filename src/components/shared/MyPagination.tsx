import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import React from 'react';
interface MyPaginationProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  prevPage: () => void;
  nextPage: () => void;
}

const MyPagination = <TData,>({
  table,
  nextPage,
  prevPage,
}: MyPaginationProps<TData>) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={!table.getCanPreviousPage() ? () => {} : prevPage}
            className={cn('cursor-pointer text-xs', {
              'cursor-not-allowed opacity-50': !table.getCanPreviousPage(),
            })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={!table.getCanNextPage() ? () => {} : nextPage}
            className={cn('cursor-pointer text-xs', {
              'cursor-not-allowed opacity-50': !table.getCanNextPage(),
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;

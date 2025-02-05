import MyPagination from '@/components/shared/MyPagination';
import SelectLimit from '@/components/shared/SelectLimit';
import { cn } from '@/lib/utils';
import { GetAllQueryParams } from '@/types/global.types';
import { Table } from '@tanstack/react-table';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface PaginationControlProps<TData, U extends GetAllQueryParams>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  setParams: Dispatch<SetStateAction<U>>;
}

const PaginationControl = <TData, U extends GetAllQueryParams>({
  table,
  setParams,
  className,
  ...props
}: PaginationControlProps<TData, U>) => {
  const [limit, setLimit] = useState(10);

  const nextPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [setParams]);
  const prevPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: prev.page - 1 }));
  }, [setParams]);

  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [limit, setParams]);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between border-t py-2',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <MyPagination table={table} nextPage={nextPage} prevPage={prevPage} />
        <SelectLimit onValueChange={(value) => setLimit(+value)} />
      </div>
      <span className="text-xs text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </span>
    </div>
  );
};

export default PaginationControl;

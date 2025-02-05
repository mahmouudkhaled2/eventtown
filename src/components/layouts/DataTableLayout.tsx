'use client';

import { flexRender, Table } from '@tanstack/react-table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  TableBody,
  TableCell,
  Table as TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableLayoutProps<TData>
  extends React.ComponentProps<typeof ScrollArea> {
  table: Table<TData>;
}

const DataTableLayout = <TData,>({
  table,
  className,
  ...props
}: DataTableLayoutProps<TData>) => {
  return (
    <ScrollArea className={cn('h-full w-full', className)} {...props}>
      <div className="h-full w-full">
        <TableContainer>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-nowrap text-xs" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="max-w-[200px] overflow-hidden text-ellipsis text-nowrap text-xs"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableContainer>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DataTableLayout;

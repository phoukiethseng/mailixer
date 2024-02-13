import {
    ColumnDef,
    Row,
    TableOptions,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type SortingState, getSortedRowModel
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./Table";
import { cn } from "../lib/utils";
import React, {useState} from "react";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    tableOptions: Partial<TableOptions<TData>>;
} & React.ComponentPropsWithoutRef<"div">;

export function DataTable<TData, TValue>({
    data,
    columns,
    className,
    tableOptions,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>();

    const {state, ...tableOptionsWithoutState} = tableOptions?.state ? tableOptions : {state: {}, ...tableOptions};

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,

            // Parent component managed state will take
            // precedence over default managed state
            ...(state ?? {})
        },

        // We do this so parent component can overwrite pre-defined configuration
        ...tableOptionsWithoutState,
    });
    return (
        <div className={cn("rounded-xl border text-foreground", className)}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
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
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => {
                                    row.toggleSelected();
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

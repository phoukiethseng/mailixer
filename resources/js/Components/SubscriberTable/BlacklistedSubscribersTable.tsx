import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    type Table,
    useReactTable
} from "@tanstack/react-table";
import React, {useState} from "react";
import {Subscriber} from "@/types/DTO";
import {columns, filterColumnList} from "@/Components/SubscriberTable/BlacklistedSubscribersColumn";
import {BaseDataTable} from "@/Components/BaseDataTable";
import {FilterColumnCombobox} from "@/Components/FilterColumnCombobox";
import {Input} from "@/Components/Input";
import {ColumnVisibilityDropdownMenu} from "@/Components/ColumnVisibilityDropdownMenu";
import {FilterColumnDef} from "@/types/util";

type BlacklistedSubscribersTableProps = {
    data: Subscriber[]
}

const BlacklistedSubscribersTable = ({data}: BlacklistedSubscribersTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [currentFilterColumn, setCurrentFilterColumn] = useState<FilterColumnDef>();

    const table: Table<Subscriber> = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters
        }
    })
    return (
        <div className={"flex flex-col items-start gap-2"}>
            <div className={"flex flex-row gap-2 justify-start"}>
                <ColumnVisibilityDropdownMenu table={table} className={"text-card-foreground bg-card"}/>
                <FilterColumnCombobox filterColumn={currentFilterColumn}
                                      onFilterColumnChange={setCurrentFilterColumn}
                                      filterColumnList={filterColumnList}
                                      className={"text-card-foreground bg-card"}
                />
                <Input disabled={!Boolean(currentFilterColumn)} placeholder={"Search"}
                       className={"w-[350px] text-card-foreground bg-card"}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const searchText = e.target.value;
                           table.getColumn(currentFilterColumn?.value ?? "")?.setFilterValue(searchText);
                       }}/>
            </div>
            <div className={"w-full"}>
                <BaseDataTable table={table} columns={columns}/>
            </div>
        </div>
    )
}

export default BlacklistedSubscribersTable;

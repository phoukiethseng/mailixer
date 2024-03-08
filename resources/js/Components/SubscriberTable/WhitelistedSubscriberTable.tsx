import React, {useState} from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    type Table,
    useReactTable
} from "@tanstack/react-table";
import {columns, filterColumnList} from "@/Components/SubscriberTable/WhitelistedSubscribersColumns";
import {FilterColumn, Subscriber} from "@/types/models";
import {BaseDataTable} from "@/Components/BaseDataTable";
import {Input} from "@/Components/Input";
import {FilterColumnCombobox} from "@/Components/FilterColumnCombobox";
import {ColumnVisibilityDropdownMenu} from "@/Components/ColumnVisibilityDropdownMenu";

type WhitelistedSubscriberTableProps = {
    data: Subscriber[]
}

const WhitelistedSubscriberTable = ({data}: WhitelistedSubscriberTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [currentFilterColumn, setCurrentFilterColumn] = useState<FilterColumn>();

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
        <div className={"flex flex-col gap-2"}>
            <div className={"self-start flex flex-row gap-2 justify-between"}>
                <ColumnVisibilityDropdownMenu table={table}/>
                <FilterColumnCombobox filterColumn={currentFilterColumn}
                                      onFilterColumnChange={setCurrentFilterColumn}
                                      filterColumnList={filterColumnList}/>
                <Input disabled={!Boolean(currentFilterColumn)} className={"w-[300px]"} placeholder={"Search"}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const searchText = e.target.value;
                           table.getColumn(currentFilterColumn?.value ?? "email")?.setFilterValue(searchText);
                       }}/>
            </div>
            <BaseDataTable table={table} columns={columns}/>
        </div>
    )
}

export default WhitelistedSubscriberTable;

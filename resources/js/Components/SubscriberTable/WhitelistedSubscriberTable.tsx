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
import {Subscriber} from "@/types/DTO";
import {BaseDataTable} from "@/Components/BaseDataTable";
import {Input} from "@/Components/Input";
import {FilterColumnCombobox} from "@/Components/FilterColumnCombobox";
import {ColumnVisibilityDropdownMenu} from "@/Components/ColumnVisibilityDropdownMenu";
import {Button} from "@/Components/Button";
import {FilterColumnDef} from "@/types/util";
import {router} from "@inertiajs/react";
import {useRoute} from "ziggy-js";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/DropDownMenu";
import {Icons} from "@/Components/Icons";

type WhitelistedSubscriberTableProps = {
    data: Subscriber[]
}

const WhitelistedSubscriberTable = ({data}: WhitelistedSubscriberTableProps) => {
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

    const route = useRoute()

    const isAnyRowSelected = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

    return (
        <div className={"flex flex-col gap-2 justify-start items-stretch"}>
            <div className={"flex flex-row gap-2 justify-start w-full"}>
                <ColumnVisibilityDropdownMenu table={table}/>
                <FilterColumnCombobox filterColumn={currentFilterColumn}
                                      onFilterColumnChange={setCurrentFilterColumn}
                                      filterColumnList={filterColumnList}/>
                <Input disabled={!Boolean(currentFilterColumn)} className={"w-[300px]"} placeholder={"Search"}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const searchText = e.target.value;
                           table.getColumn(currentFilterColumn?.value ?? "email")?.setFilterValue(searchText);
                       }}/>
                {
                    isAnyRowSelected &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} className={"ml-auto"} size={"icon"}>
                                <Icons.CircleEllipsis strokeWidth={1.5} size={15}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className={"flex flex-row gap-2 text-destructive hover:text-destructive"} onClick={() => {
                                const selectedRows = table.getSelectedRowModel().rows;
                                const subscriberIdList = selectedRows.map(row => ({id: row.getValue('id') as string}));
                                router.delete(route('dashboard.batch.unsubscribe'), {
                                    data: {
                                        subscriberIdList: subscriberIdList
                                    }
                                })
                            }}>
                                <Icons.UserX strokeWidth={1.5} size={15}/>
                                <span>Unsubscribe</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className={"flex flex-row gap-2"} onClick={() => {
                                const selectedRows = table.getSelectedRowModel().rows;
                                const subscriberIdList = selectedRows.map(subscriberRow => ({id: subscriberRow.getValue('id') as string}));
                                router.post(route("dashboard.batch.blacklist"), {
                                    subscriberIdList
                                });
                            }}>
                                <Icons.UserX strokeWidth={1.5} size={15}/>
                                <span>Blacklist</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            <BaseDataTable table={table} columns={columns} />
        </div>
    )
}

export default WhitelistedSubscriberTable;

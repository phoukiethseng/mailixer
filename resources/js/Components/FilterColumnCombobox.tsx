import {FilterColumn} from "@/types/models";
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/Popover";
import {Button} from "@/Components/Button";
import {Icons} from "@/Components/Icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/Components/Command";
import {filterColumnList} from "@/Components/SubscriberTable/WhitelistedSubscribersColumns";

export function FilterColumnCombobox(props: {
    filterColumn: FilterColumn | undefined,
    onFilterColumnChange: (column: FilterColumn) => any;
    filterColumnList: FilterColumn[],
}) {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    return <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
            <Button
                role={"combobox"}
                variant={"outline"}
                className={"min-w-[100px] w-[200px] flex flex-row justify-between"}
            >
                            <span className={"text-muted-foreground"}>
                                {
                                    props.filterColumn?.name ?? "Filter"
                                }
                            </span>
                <Icons.ChevronsUpDown strokeWidth={1.5} size={16}/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className={"p-0 w-[200x]"}>
            <Command>
                <CommandInput placeholder={"Column to filter"}/>
                <CommandEmpty>There is matched column name</CommandEmpty>
                <CommandGroup>
                    {
                        filterColumnList.map((col, index) => (
                            <CommandItem key={index} value={col.value} onSelect={() => {
                                props.onFilterColumnChange(filterColumnList[index]);
                                setPopoverOpen(false);
                            }}>
                                {col.name}
                            </CommandItem>
                        ))
                    }
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>;
}

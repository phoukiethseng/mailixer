import React from "react";
import {Input} from "@/Components/Input";
import {LucideIcon, LucideProps} from "lucide-react";
import {cn} from "@/lib/utils";
import {Separator} from "@/Components/Separator";

type IconInputProps = {
    icon: LucideIcon;
} & React.ComponentPropsWithoutRef<"input">

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>((props, ref) => {
    const {icon: Icon, ...forwardedProps} = props
    const iconProps: LucideProps = {
        strokeWidth: 1.5,
        size: 19
    }
    return (
        <div className={cn("w-full flex flex-row justify-start items-center border border-input rounded-md p-0 m-0 pl-2", props.className)}>
            <Icon {...iconProps} className={"text-muted-foreground"}/>
            <Separator orientation={"vertical"} className={"h-6 ml-2"}/>
            <Input className={"border-none rounded-none shadow-none focus-visible:ring-0"} {...props} ref={ref} />
        </div>
    )
})

export default IconInput;
import {ResponsiveLine, type LineSvgProps, type Serie} from "@nivo/line";
import React from "react";

type BumpProps = {
    data: Array<Serie>
} & LineSvgProps & React.ComponentPropsWithoutRef<"div">

const Line = (props: BumpProps) => {
    const defaultProps: Partial<LineSvgProps> = {
        margin: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40,
        },
        enablePoints: true,
        pointSize: 10,
        colors: {
            scheme: "category10"
        }

    }
    const finalProps = {...defaultProps, ...props}
    return (
        <ResponsiveLine  {...finalProps} />
    )
}

export default Line;

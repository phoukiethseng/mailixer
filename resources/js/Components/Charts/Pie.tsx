import React from "react";
import {
    ResponsivePie,
    type CommonPieProps,
    type DefaultRawDatum,
    type MayHaveLabel,
} from "@nivo/pie";
import defaultTheme from "./config/theme";

type PieChartProps = {
    data: Array<DefaultRawDatum & MayHaveLabel>;
} & CommonPieProps<DefaultRawDatum>;

const PieChart = (props: PieChartProps) => {
    const defaultProsp: Partial<CommonPieProps<DefaultRawDatum>> = {
        // @ts-ignore
        theme: defaultTheme,
        innerRadius: 0.35,
        activeOuterRadiusOffset: 5,
        borderWidth: 2,
        padAngle: 3,
        cornerRadius: 8,
        margin: {
            top: 8,
            bottom: 8,
        },
        colors: {scheme: "green_blue"}
    };
    const finalProps = { ...defaultProsp, ...props };
    return <ResponsivePie {...finalProps} />;
};
export default PieChart;

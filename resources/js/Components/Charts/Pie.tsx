import React from 'react'
import {
  type CommonPieProps,
  type DefaultRawDatum,
  type MayHaveLabel,
  ResponsivePie,
} from '@nivo/pie'
import defaultTheme from '@/Components/Charts/config/theme'

type PieChartProps = {
  data: Array<DefaultRawDatum & MayHaveLabel>
  className: string
} & CommonPieProps<DefaultRawDatum>

const PieChart = (props: PieChartProps) => {
  const defaultProsp: Partial<CommonPieProps<DefaultRawDatum>> = {
    // @ts-ignore
    theme: defaultTheme,
    innerRadius: 0.35,
    activeOuterRadiusOffset: 5,
    borderWidth: 1,
    padAngle: 4,
    cornerRadius: 4,

    colors: { scheme: 'set2' },
    borderColor: {
      from: 'color',
      modifiers: [['darker', 0.5]],
    },
  }

  const finalProps = { ...defaultProsp, ...props }
  return <ResponsivePie {...finalProps} />
}
export default PieChart

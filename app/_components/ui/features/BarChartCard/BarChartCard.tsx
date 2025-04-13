import { BarChart, CartesianGrid, XAxis, Bar } from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/_components/ui/core/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/core/chart"

type BarChartCardProps = {
  title: string
  chartData: { key: number | string; value: number }[]
  className?: string
}

const chartConfig = {
  age: {
    label: "Age",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function BarChartCard({
  title,
  chartData,
  className = "",
}: BarChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full relative">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

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

export default function BarChartCard({
  title,
  chartData,
  className = "",
}: BarChartCardProps) {
  const chartConfig = {
    key: {
      label: title,
      color: "#fefefe",
    },
  } satisfies ChartConfig

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full relative flex justify-center items-center">
        <ChartContainer config={chartConfig} className="sm:h-48 w-full">
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

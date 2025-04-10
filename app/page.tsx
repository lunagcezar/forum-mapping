"use client"

import { BarChart, CartesianGrid, XAxis, Bar } from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./_components/ui/core/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./_components/ui/core/chart"
import { getSurveys } from "./_utils/data"
import { useEffect, useState } from "react"
import { Survey } from "./_types/survey"
import { getAgeChartData } from "./_utils/chart"

export const dynamic = "force-dynamic"

const chartConfig = {
  age: {
    label: "Age",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Home() {
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    async function fetchSurveys() {
      const data = await getSurveys()
      setSurveys(data)
    }
    fetchSurveys()
  }, [])

  const ageChartData = getAgeChartData(surveys)

  return (
    <div className="grid md:grid-cols-12 gap-8 p-8 h-96">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Idade</CardTitle>
        </CardHeader>
        <CardContent className="h-full w-full relative">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={ageChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="age"
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
    </div>
  )
}

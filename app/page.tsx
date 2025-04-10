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
import { PostgrestError } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Home() {
  const [surveys, setSurveys] = useState<any[] | PostgrestError>(null)

  useEffect(() => {
    async function fetchSurveys() {
      const data = await getSurveys()
      setSurveys(data)
    }
    fetchSurveys()
  }, [])

  console.log(surveys)

  return (
    <div className="grid md:grid-cols-12 gap-8 p-8 h-96">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Idade</CardTitle>
        </CardHeader>
        <CardContent className="h-full w-full relative">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { getSurveys } from "./_utils/data"
import { useEffect, useState } from "react"
import { Survey } from "./_types/survey"
import { getChartData } from "./_utils/chart"
import BarChartCard from "./_components/ui/features/BarChartCard"

export const dynamic = "force-dynamic"

export default function Home() {
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    async function fetchSurveys() {
      const data = await getSurveys()
      setSurveys(data)
    }
    fetchSurveys()
  }, [])

  const ageChartData = getChartData(surveys, "age")

  return (
    <div className="grid md:grid-cols-12 gap-8 p-8 h-96">
      <BarChartCard
        title={"Idade"}
        chartData={ageChartData}
        className="col-span-3"
      />
    </div>
  )
}

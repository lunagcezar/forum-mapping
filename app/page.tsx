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

  const genderChartData = getChartData(surveys, "gender")

  const raceChartData = getChartData(surveys, "race")

  return (
    <div className="grid sm:grid-cols-12 gap-8">
      <BarChartCard
        title={"Idade"}
        chartData={ageChartData}
        className="col-span-4 sm:h-72"
      />
      <BarChartCard
        title={"Gênero"}
        chartData={genderChartData}
        className="col-span-4 sm:h-72"
      />
      <BarChartCard
        title={"Raça"}
        chartData={raceChartData}
        className="col-span-4 sm:h-72"
      />
    </div>
  )
}

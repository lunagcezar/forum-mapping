import { Survey } from "../_types/survey"

export function getChartData(surveys: Survey[], key: string) {
  const data = [] as number[]

  const chartData = [] as { key: string | number; value: number }[]

  surveys.map((a) => {
    data.push(
      Number(
        a.Answer?.filter((b) => b.key === key)?.find((c) => c.surveyId === a.id)
          ?.value
      )
    )
  })

  data.sort((a, b) => a - b)

  data.map((a) => {
    const chartDataRef = chartData.find((b) => b.key === a)
    if (typeof chartDataRef !== "undefined") {
      chartDataRef.value += 1
    } else {
      chartData.push({ key: a, value: 1 })
    }
  })

  return chartData
}

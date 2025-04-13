import { Survey } from "../_types/survey"

export function getChartData(surveys: Survey[], key: string) {
  const stringsData = [] as string[]

  const numbersData = [] as number[]

  const chartData = [] as { key: string | number; value: number }[]

  surveys.map((a) => {
    const value = a.Answer?.filter((b) => b.key === key)?.find(
      (c) => c.surveyId === a.id
    )?.value

    if (typeof value === "number") {
      numbersData.push(Number(value))
    } else if (typeof value === "string") {
      stringsData.push(value)
    }
  })

  if (numbersData.length > 0) {
    numbersData.sort((a, b) => a - b)
    numbersData.map((a) => {
      const chartDataRef = chartData.find((b) => b.key === a)
      if (typeof chartDataRef !== "undefined") {
        chartDataRef.value += 1
      } else {
        chartData.push({ key: a, value: 1 })
      }
    })
  } else if (stringsData.length > 0) {
    stringsData.sort((a, b) => a.localeCompare(b))
    stringsData.map((a) => {
      const chartDataRef = chartData.find((b) => b.key === a)
      if (typeof chartDataRef !== "undefined") {
        chartDataRef.value += 1
      } else {
        chartData.push({ key: a, value: 1 })
      }
    })
  }

  return chartData
}

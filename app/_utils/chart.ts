import { Survey } from "../_types/survey"

export function getAgeChartData(surveys: Survey[]) {
  const ages = [] as number[]

  const ageChartData = [] as { age: number; value: number }[]

  surveys.map((a) => {
    ages.push(Number(a.Answer?.find((b) => b.surveyId === a.id)?.value))
  })

  ages.sort((a, b) => a - b)

  ages.map((a) => {
    const ageChartDataRef = ageChartData.find((b) => b.age === a)
    if (typeof ageChartDataRef !== "undefined") {
      ageChartDataRef.value += 1
    } else {
      ageChartData.push({ age: a, value: 1 })
    }
  })

  return ageChartData
}

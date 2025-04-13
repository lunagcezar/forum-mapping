import { DBProperties } from "./data"

export type Answer = DBProperties & {
  surveyId: number
  key: string
  value?: string | number
}

export type Survey = DBProperties & {
  name?: string
  email?: string
  Answer?: Answer[]
}

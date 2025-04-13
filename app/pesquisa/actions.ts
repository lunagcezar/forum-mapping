"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/app/_utils/supabase/server"
import { Answer, Survey } from "../_types/survey"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { SurveyFormData } from "../_types/form"

export async function sendSurvey(data: SurveyFormData) {
  const supabase = await createClient()

  const { name: formName, email: formEmail, ...formData } = data

  const surveyData = {
    name: formName,
    email: formEmail,
  } as Survey

  const sendSurvey = (await supabase
    .from("Survey")
    .insert(surveyData)
    .select()) as PostgrestSingleResponse<Survey[]>

  if (sendSurvey.error) {
    console.log(sendSurvey.error)
    redirect("/erro")
  } else {
    console.log(sendSurvey.data[0].id)
  }

  const answersData = [] as Answer[]

  let key: keyof typeof formData

  for (key in formData) {
    answersData.push({
      surveyId: sendSurvey.data[0].id ?? NaN,
      key: key,
      value: formData[key],
    })
  }

  const sendAnswers = (await supabase
    .from("Answer")
    .insert(answersData)
    .select()) as PostgrestSingleResponse<Answer[]>

  if (sendAnswers.error) {
    console.log(sendAnswers.error)
    redirect("/erro")
  } else {
    console.log(sendAnswers.data[0].id)
  }

  revalidatePath("/", "layout")
  redirect("/")
}

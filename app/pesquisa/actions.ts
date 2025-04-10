"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/app/_utils/supabase/server"
import { Answer, Survey } from "../_types/survey"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export async function sendSurvey(formData: FormData) {
  const supabase = await createClient()

  const surveyData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
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

  const answersData = [
    {
      surveyId: sendSurvey.data[0].id,
      key: "Idade",
      value: formData.get("age") as string,
    },
  ] as Answer[]

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

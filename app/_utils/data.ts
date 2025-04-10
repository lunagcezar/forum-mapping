"use server"

import { createClient } from "@/app/_utils/supabase/server"

export async function getSurveys() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("Survey").select("*, Answer(*)")

  if (error) {
    return []
  } else {
    return data
  }
}

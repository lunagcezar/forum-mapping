import { createClient } from "@/app/_utils/supabase/server"

export async function getSurveys() {
  const supabase = await createClient()

  const { data } = await supabase.from("surveys").select("*")

  return console.log(data)
}

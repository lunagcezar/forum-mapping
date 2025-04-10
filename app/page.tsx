import { createClient } from "@/app/_utils/supabase/server"

async function getSurveys() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("Survey").select("*, Answer(*)")

  if (error) {
    return error
  } else {
    return data
  }
}

export default async function Home() {
  const surveysData = await getSurveys()

  console.log(surveysData)

  return <div>aa</div>
}

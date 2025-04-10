import { createClient } from "@/app/_utils/supabase/server"
import { Card, CardContent, CardFooter } from "../_components/ui/core/card"
import { Button } from "../_components/ui/core/button"

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Card className="self-center justify-self-center w-96">
      <CardContent className="flex flex-col gap-4">
        <div>{user?.email}</div>
      </CardContent>
      <CardFooter className="flex">
        <form action="/auth/signout" method="post">
          <Button className="button block" type="submit">
            Sign out
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

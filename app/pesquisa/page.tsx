"use client"

import { Button } from "../_components/ui/core/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/core/form"
import { Input } from "../_components/ui/core/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardFooter } from "../_components/ui/core/card"
import { sendSurvey } from "./actions"
import { toast } from "sonner"
import { useEffect } from "react"

export default function SurveyPage() {
  const formSchema = z.object({
    name: z.string().min(1, "Campo obrigatório"),
    email: z.string().min(1, "Campo obrigatório").email("Formato de email"),
    age: z.coerce.number().gte(18).lte(100),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  })

  async function formAction(formData: FormData) {
    if (form.formState.isValid) {
      return sendSurvey(formData)
    } else {
      return toast("Erro de validação") as unknown as Promise<void>
    }
  }

  useEffect(() => console.log(form.formState.isValid), [form.formState.isValid])

  return (
    <Form {...form}>
      <form className="self-center justify-self-center w-96">
        <Card>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input id="age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              className="flex-1"
              type="submit"
              formAction={(e) => formAction(e)}
            >
              Enviar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

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
import { login, signup } from "./actions"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardFooter } from "../_components/ui/core/card"
import { toast } from "sonner"

export default function LoginPage() {
  const formSchema = z.object({
    email: z.string().min(1, "Campo obrigatório").email("Formato de email"),
    password: z.string().min(6, "Mínimo de 6 caracteres"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function formAction(formData: FormData, type: "login" | "signup") {
    if (form.formState.isValid) {
      if (type === "login") {
        return login(formData)
      } else if (type === "signup") {
        return signup(formData)
      }
    } else {
      return toast("Erro de validação") as unknown as Promise<void>
    }
  }

  return (
    <Form {...form}>
      <form className="self-center justify-self-center w-96">
        <Card>
          <CardContent className="flex flex-col gap-4">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" {...field} />
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
              formAction={(e) => formAction(e, "login")}
            >
              Entrar
            </Button>
            <Button
              className="flex-1"
              type="submit"
              formAction={(e) => formAction(e, "signup")}
            >
              Registrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

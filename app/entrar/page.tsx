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

export default function LoginPage() {
  const formSchema = z.object({
    email: z.string().min(1, "Campo obrigatório").email("Formato de email"),
    password: z.string().min(1, "Campo obrigatório"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Form {...form}>
      <form className="self-center justify-self-center w-96">
        <Card>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" name="email" type="email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1" formAction={login}>
              Entrar
            </Button>
            <Button className="flex-1" formAction={signup}>
              Registrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

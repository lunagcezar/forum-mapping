"use client"

import { Input } from "../_components/ui/core/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/core/card"
import { sendSurvey } from "./actions"
import { ChevronsUpDown, Check } from "lucide-react"
import { races } from "../_constants/data"

import { cn } from "@/lib/utils"
import { Button } from "../_components/ui/core/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../_components/ui/core/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/core/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../_components/ui/core/popover"
import { toast } from "sonner"
import Asterisk from "../_components/ui/core/asterisk"

export default function SurveyPage() {
  const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    portfolio: z.string().optional(),
    race: z.string().min(1, "Campo obrigatório"),
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

  return (
    <Form {...form}>
      <form className="self-center justify-self-center w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>
              Mapeamento Fórum Deliberativo de Design no Ceará
            </CardTitle>
            <CardDescription className="flex flex-col gap-3">
              <div>Ei, designer! 👋🏽</div>
              <div>
                Seja bem-vinde ao início de uma conversa importante sobre o
                futuro do nosso campo.
              </div>
              <div>
                Esse formulário faz parte da construção do{" "}
                <strong>Fórum Deliberativo de Design do Ceará</strong>, uma
                iniciativa que nasce do desejo de nos organizarmos como
                categoria para atuar com mais autonomia, presença política e
                articulação com as políticas públicas.
              </div>
              <div>
                Queremos entender onde estão os designers do Ceará, quais são
                suas problemáticas e desejos, e como o Fórum pode responder a
                essas necessidades de forma colaborativa e contínua.
              </div>
              <div className="flex flex-col gap-1">
                <div>As respostas vão nos ajudar a:</div>
                <ul className="ml-4 list-disc">
                  <li>Mapear o campo do design no estado;</li>
                  <li>
                    Criar um calendário de ações formativas e políticas para
                    2025-2026;
                  </li>
                  <li>
                    Estruturar uma rede que funcione de forma horizontal e viva,
                    com oficinas, formações, publicações, podcasts, newsletters
                    e muito mais.
                  </li>
                </ul>
              </div>

              <div>
                💡 Os dados serão abertos e visíveis, pra todo mundo acompanhar
                em tempo real o que tá rolando e ajudar a construir juntos.
              </div>
              <div>
                Esse é só o primeiro passo. Ainda tem muito trabalho pela
                frente, mas a gente acredita que quanto mais organizades formos,
                mais força a gente tem para transformar.
              </div>
              <div>
                🫶🏽 Preenche com carinho e compartilha com outros designers do
                seu território! Leva menos de 10 minutos!
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-red-500 text-sm">
              <Asterisk /> Campos obrigatórios
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual seu nome?</FormLabel>
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
                  <FormLabel>
                    Gostaria de deixar seu e-mail de contato?
                  </FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gostaria de compartilhar seu portfólio? Se sim, informe o
                    link abaixo
                  </FormLabel>
                  <FormControl>
                    <Input id="portfolio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="race"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Você gostaria de nos contar como se identifica racial ou
                    etnicamente? <Asterisk />
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? races.find((race) => race.value === field.value)
                                ?.label
                            : "Selecione uma raça"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Selecione a sua raça..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Sem resultados</CommandEmpty>
                          <CommandGroup>
                            {races.map((race) => (
                              <CommandItem
                                value={race.label}
                                key={race.value}
                                onSelect={() => {
                                  form.setValue("race", race.value)
                                }}
                              >
                                {race.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    race.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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

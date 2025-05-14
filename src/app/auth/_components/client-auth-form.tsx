'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Loader2, Mail } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation' 


const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

const signUpSchema = signInSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
})

export default function ClientAuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  // Mover o useRouter para dentro do componente, pois não pode ser utilizado fora dele.
 
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSignIn(values: z.infer<typeof signInSchema>) {
    setIsLoading(true)
    const supabase = createClientComponentClient()
    const { email, password } = values

    try {
      const { error, data: { session } } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (session) {

        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Usuário logado com sucesso",
            description: "Bem-vindo!",
          })
        }, 2000)

        setTimeout(() => {
          router.refresh() // Redirecionamento após o sucesso
        }, 3000)
      }

      if(error){
        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Erro ",
            description: "Não foi possível logar o usuário",
          })
        }, 2000)
      }

    } catch (error) {
      console.log("LoginUser", error)
    }
  }

  async function onSignUp(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true)
    const supabase = createClientComponentClient()
    const { email, password } = values

    try {
      const { error, data: { user } } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (user) {
        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Usuário cadastrado com sucesso",
            description: "Bem-vindo!",
          })
        }, 2000)

        setTimeout(() => {
          router.refresh() // Redirecionamento após o sucesso
        }, 1000)
      }

      if(error){
        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Erro ",
            description: "Não foi possível cadastrar seus dados",
          })
        }, 2000)
      }

    } catch (error) {
      console.log("CreateAccountForm", error)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <Card className="w-full  mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Bem vindo!</CardTitle>
            <CardDescription className="text-center">Faça login em sua conta ou crie uma nova</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Fazer Login</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Informe seu email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Informe sua senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logando...
                        </>
                      ) : (
                        'Entrar'
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signup">
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Informe seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Informe seu email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Criar senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        'Cadastrar'
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

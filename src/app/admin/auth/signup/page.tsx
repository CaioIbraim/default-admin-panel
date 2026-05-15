"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Lock, UserPlus } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Swal from "sweetalert2"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setIsLoading(false)
    
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message,
      })
    } else {
      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Cadastro realizado com sucesso! Verifique seu email.",
        showConfirmButton: false,
        timer: 2000,
        willClose: () => {
          router.push("/admin/auth/signin")
        },
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Back Link */}
      <div className="absolute left-4 top-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="opacity-90"
            />
          </Link>
        </div>

        {/* Signup Card */}
        <Card className="border-border/40">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <UserPlus className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Criar conta</CardTitle>
            <CardDescription>
              Preencha os dados para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Ja tem uma conta?{" "}
              <Link 
                href="/admin/auth/signin" 
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import ClientAuthForm from "./_components/client-auth-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  // Criar o cliente do Supabase para acessar os cookies do navegador
  const supabase = createServerComponentClient({ cookies });

  // Verifica a sessão do usuário
  const { data: { session } } = await supabase.auth.getSession();

  // Se o usuário estiver logado, redireciona para "/app"
  if (session) {
    redirect("/app");
  }

  // Se o usuário não estiver logado, renderiza o formulário de login
  return (
    <main className="flex items-center justify-center h-screen">
      <ClientAuthForm />
    </main>
  );
}

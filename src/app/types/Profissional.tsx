// Interface para Profissionais
export  interface Profissional {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    imagem_url?: string; // imagem_url
    data_criacao: string; // TIMESTAMP
}
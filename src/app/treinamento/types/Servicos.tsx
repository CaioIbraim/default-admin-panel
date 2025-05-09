export interface Servicos {
    id: number;
    nome: string;
    descricao : string;
    imagem_url?: string; // nova coluna para imagem do serviço
    preco: number; // nova coluna para preço
}
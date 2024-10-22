// Interface para Agendamentos
export interface Agendamento {
    id: number;
    profissional_id: number; // ID do profissional
    servico_id: number; // ID do serviço
    cliente_nome: string; // Nome do cliente
    cliente_email: string; // Email do cliente
    data_hora: string; // Data e hora do agendamento
    status?: 'agendado' | 'cancelado' | 'concluído'; // Status do agendamento
    data_criacao: string; // Timestamp da criação
    servicos?: {
        nome: string;
        imagem_url?: string; // nova coluna para imagem do serviço
        preco: number; // nova coluna para preço
    };
}

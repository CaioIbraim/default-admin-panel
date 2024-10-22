// Interface para Agendamentos
import { Servicos } from "./Servicos";
export interface Agendamento {
    id: number;
    profissional_id: number; // ID do profissional
    servico_id: number; // ID do serviço
    cliente_nome: string; // Nome do cliente
    cliente_email: string; // Email do cliente
    cliente_celular?: string; // Celular do cliente
    data_hora: Date; // Data e hora do agendamento
    status?: 'agendado' | 'cancelado' | 'concluído'; // Status do agendamento
    data_criacao: Date; // Timestamp da criação
    servicos?:Servicos;
}

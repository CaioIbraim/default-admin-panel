export interface Treinamento {
    id: number;
    curso_id: number;
    data_inicio: Date;
    data_fim: Date;
    local: string;
    status: 'agendado' | 'concluído'; // enum para status
    criado_em: Date;
    atualizado_em: Date;
    valor:number;
  }
  
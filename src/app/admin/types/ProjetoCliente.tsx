export interface ProjetoCliente {
    id: number;
    clienteId: number;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    status: 'ativo' | 'concluído'; // enum para status
    criadoEm: Date;
    atualizadoEm: Date;
  }
  
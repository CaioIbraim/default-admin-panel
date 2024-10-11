export interface Treinamento {
    id: number;
    cursoId: number;
    dataInicio: Date;
    dataFim: Date;
    local: string;
    status: 'agendado' | 'concluído'; // enum para status
    criadoEm: Date;
    atualizadoEm: Date;
  }
  
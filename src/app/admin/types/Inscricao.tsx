export interface Inscricao {
    id: number;
    alunoId: number;
    cursoId?: number; // opcional, pois pode ser um treinamento
    treinamentoId?: number; // opcional, pois pode ser um curso
    valor: number; // valor específico da inscrição
    dataInscricao: Date;
    status: 'ativa' | 'concluída' | 'cancelada'; // enum para status
  }
  